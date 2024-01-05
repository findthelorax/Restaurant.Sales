import moment from 'moment';
import { updateDailyTotal } from '../api/salesTotals';

export let tipOutPercentages = {
	Bartender: 0.05,
	Runner: 0.04,
	Host: 0.015,
};

export const updateTipOutPercentages = (newPercentages) => {
	tipOutPercentages = { ...newPercentages };
};

export const CalculateTipOuts = (selectedTeamMember, dailyTotals, teamMembers) => {
	let bartenderTipOut = 0;
	let runnerTipOut = 0;
	let hostTipOut = 0;

	// Count the number of bartenders, runners, and hosts working on the same day
	const bartendersCount = teamMembers.filter(
		(member) =>
			member.position === 'Bartender' &&
			member.dailyTotals.some((total) => {
				return moment.utc(total.date).isSame(moment.utc(dailyTotals.date), 'day');
			})
	).length;

	const runnersCount = teamMembers.filter(
		(member) =>
			member.position === 'Runner' &&
			member.dailyTotals.some((total) => moment.utc(total.date).isSame(moment.utc(dailyTotals.date), 'day'))
	).length;

	const hostsCount = teamMembers.filter(
		(member) =>
			member.position === 'Host' &&
			member.dailyTotals.some((total) => moment.utc(total.date).isSame(moment.utc(dailyTotals.date), 'day'))
	).length;

	// Calculate tip outs if there are servers
	const servers = teamMembers.filter(member => member.position === 'Server');
	servers.forEach(server => {
		const serverDailyTotal = server.dailyTotals.find((total) =>
			moment.utc(total.date).isSame(moment.utc(dailyTotals.date), 'day')
		);

		if (serverDailyTotal) {
			bartenderTipOut += bartendersCount > 0 ? Number(serverDailyTotal.barSales) * tipOutPercentages.Bartender : 0;
			runnerTipOut += runnersCount > 0 ? Number(serverDailyTotal.foodSales) * tipOutPercentages.Runner : 0;
			hostTipOut += hostsCount > 0 ? Number(serverDailyTotal.foodSales) * tipOutPercentages.Host : 0;

			const totalTipOut = bartenderTipOut + runnerTipOut + hostTipOut;

			// Deduct tip outs from server's daily totals
			serverDailyTotal.bartenderTipOuts = bartenderTipOut;
			serverDailyTotal.runnerTipOuts = runnerTipOut;
			serverDailyTotal.hostTipOuts = hostTipOut;
			serverDailyTotal.totalTipOut = totalTipOut;
		}
	});

	// Distribute tip outs to bartenders, runners, and hosts who worked the same day
	distributeTipOuts(teamMembers, dailyTotals.date, bartenderTipOut, runnerTipOut, hostTipOut);

	return {
		Bartender: bartenderTipOut,
		Runner: runnerTipOut,
		Host: hostTipOut,
	};
};

export const handleNewTeamMember = async (newMember, teamMembers) => {
    // Define serverTotal here
    let serverTotal = null;

    if (newMember.position === 'Bartender' || newMember.position === 'Runner' || newMember.position === 'Host') {
        // Find the servers who worked on the same day as the new member
        const servers = teamMembers.filter(
            (member) =>
                member.position === 'Server' &&
                member.dailyTotals.some((total) => moment.utc(total.date).isSame(moment.utc(newMember.date), 'day'))
        );

        servers.forEach((server) => {
            // Recalculate the server's tip outs
            serverTotal = CalculateTipOuts(
                server,
                server.dailyTotals.find((total) => moment.utc(total.date).isSame(moment.utc(newMember.date), 'day')),
                teamMembers
            );

            // Update the server's daily totals
            const total = server.dailyTotals.find((total) =>
                moment.utc(total.date).isSame(moment.utc(newMember.date), 'day')
            );

            if (total) {
                total.bartenderTipOuts = serverTotal.Bartender;
                total.runnerTipOuts = serverTotal.Runner;
                total.hostTipOuts = serverTotal.Host;
                total.totalTipOut = serverTotal.Bartender + serverTotal.Runner + serverTotal.Host;
            }

            // Distribute the recalculated tip outs
            distributeTipOuts(teamMembers, newMember.date, serverTotal.Bartender, serverTotal.Runner, serverTotal.Host);
        });

        // Update the new member's totals
        const newMemberTotal = newMember.dailyTotals.find((total) =>
            moment.utc(total.date).isSame(moment.utc(newMember.date), 'day')
        );

        if (newMemberTotal) {
			newMemberTotal.tipsReceived = newMember.position === 'Bartender' ? serverTotal.Bartender :
			newMember.position === 'Runner' ? serverTotal.Runner :
			newMember.position === 'Host' ? serverTotal.Host : 0;
			
            console.log("🚀 ~ file: tipOuts.js:130 ~ handleNewTeamMember ~ newMemberTotal:", newMemberTotal)
			console.log("🚀 ~ file: tipOuts.js:131 ~ handleNewTeamMember ~ newMember:", newMember)
            // Persist the changes
            try {
				await updateDailyTotal(newMember._id, newMemberTotal._id, newMemberTotal);
            } catch (error) {
                console.error('Failed to handle new team member updates:', error);
            }
        }
    }
};

const distributeTipOuts = async (teamMembers, date, bartenderTipOut, runnerTipOut, hostTipOut) => {
	for (const member of teamMembers) {
		if (member.dailyTotals) {
			const total = member.dailyTotals.find((total) => moment.utc(total.date).isSame(moment.utc(date), 'day'));
			
			if (total) {
				if (member.position.toLowerCase() === 'bartender') {
					total.tipsReceived += bartenderTipOut;
				} else if (member.position.toLowerCase() === 'runner') {
					total.tipsReceived += runnerTipOut; // Corrected here
				} else if (member.position.toLowerCase() === 'host') {
					total.tipsReceived += hostTipOut;
				}
				
				console.log("🚀 ~ file: tipOuts.js:146 ~ distributeTipOuts ~ member:", member)
				console.log("🚀 ~ file: tipOuts.js:151 ~ distributeTipOuts ~ total:", total)
				// Persist the changes
				try {
					await updateDailyTotal(member._id, total._id, total); // Use updateDailyTotal instead of updateTeamMember
				} catch (error) {
					console.error('Failed to distribute tip outs to team member:', error);
				}
			}
		}
	}
};

export const handleDailyTotalDeletion = async (deletedMember, teamMembers) => {
	if (
		deletedMember.position === 'Bartender' ||
		deletedMember.position === 'Runner' ||
		deletedMember.position === 'Host'
	) {
		// Find the servers who worked on the same day as the deleted member
		const servers = teamMembers.filter(
			(member) =>
				member.position === 'Server' &&
				member.dailyTotals.some((total) => moment.utc(total.date).isSame(moment.utc(deletedMember.date), 'day'))
		);

		servers.forEach(async (server) => {
			// Recalculate the server's tip outs
			const serverTotal = CalculateTipOuts(
				server,
				server.dailyTotals.find((total) =>
					moment.utc(total.date).isSame(moment.utc(deletedMember.date), 'day')
				),
				teamMembers
			);

			// Update the server's daily totals
			const total = server.dailyTotals.find((total) =>
				moment.utc(total.date).isSame(moment.utc(deletedMember.date), 'day')
			);

			if (total) {
				total.bartenderTipOuts = serverTotal.Bartender;
				total.runnerTipOuts = serverTotal.Runner;
				total.hostTipOuts = serverTotal.Host;
				total.totalTipOut = serverTotal.Bartender + serverTotal.Runner + serverTotal.Host;

				// Persist the changes
				try {
					await updateDailyTotal(server._id, total._id, total);
				} catch (error) {
					console.error('Failed to update server totals after deletion:', error);
				}
			}

			// Distribute the recalculated tip outs
			distributeTipOuts(
				teamMembers,
				deletedMember.date,
				serverTotal.Bartender,
				serverTotal.Runner,
				serverTotal.Host
			);
		});
	}
};