import moment from 'moment';

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

	if (selectedTeamMember.position === 'Server') {
		// Count the number of bartenders, runners, and hosts working on the same day
		// const bartendersCount = teamMembers.filter(member => member.position === 'Bartender' &&
		//     member.workSchedule.some(date => moment(date).isSame(moment(dailyTotals.date), 'day'))
		// ).length;

		// const runnersCount = teamMembers.filter(member => member.position === 'Runner' &&
		//     member.workSchedule.some(date => moment(date).isSame(moment(dailyTotals.date), 'day'))
		// ).length;

		// const hostsCount = teamMembers.filter(member => member.position === 'Host' &&
		//     member.workSchedule.some(date => moment(date).isSame(moment(dailyTotals.date), 'day'))
		// ).length;

		// Count the number of bartenders, runners, and hosts working on the same day
		const bartendersCount = teamMembers.filter(
			(member) =>
				member.position === 'Bartender' &&
				member.dailyTotals.some((total) => moment(total.date).isSame(moment(dailyTotals.date), 'day'))
		).length;

		const runnersCount = teamMembers.filter(
			(member) =>
				member.position === 'Runner' &&
				member.dailyTotals.some((total) => moment(total.date).isSame(moment(dailyTotals.date), 'day'))
		).length;

		const hostsCount = teamMembers.filter(
			(member) =>
				member.position === 'Host' &&
				member.dailyTotals.some((total) => moment(total.date).isSame(moment(dailyTotals.date), 'day'))
		).length;

		// Only calculate tip outs if there were bartenders, runners, or hosts working on the same day
		if (bartendersCount > 0 || runnersCount > 0 || hostsCount > 0) {
			// Calculate server tip outs
			bartenderTipOut = bartendersCount > 0 ? Number(dailyTotals.barSales) * tipOutPercentages.Bartender : 0;
			runnerTipOut = runnersCount > 0 ? Number(dailyTotals.foodSales) * tipOutPercentages.Runner : 0;
			hostTipOut = hostsCount > 0 ? Number(dailyTotals.foodSales) * tipOutPercentages.Host : 0;

			const totalTipOut = bartenderTipOut + runnerTipOut + hostTipOut;

			// Deduct tip outs from server's daily totals
			const serverTotal = selectedTeamMember.dailyTotals.find((total) =>
				moment(total.date).isSame(moment(dailyTotals.date), 'day')
			);

			if (serverTotal) {
				serverTotal.bartenderTipOuts += bartenderTipOut;
				serverTotal.runnerTipOuts += runnerTipOut;
				serverTotal.hostTipOuts += hostTipOut;
				serverTotal.totalTipOut += totalTipOut;
			}

			// Distribute tip outs to bartenders, runners, and hosts who worked the same day
			distributeTipOuts(teamMembers, dailyTotals.date, bartenderTipOut, runnerTipOut, hostTipOut);
		}
	}

	return {
		Bartender: bartenderTipOut,
		Runner: runnerTipOut,
		Host: hostTipOut,
	};
};

const distributeTipOuts = (teamMembers, date, bartenderTipOut, runnerTipOut, hostTipOut) => {
	for (const member of teamMembers) {
		if (member.dailyTotals) {
			const total = member.dailyTotals.find((total) => moment(total.date).isSame(moment(date), 'day'));

			if (total) {
				if (member.position.toLowerCase() === 'bartender') {
					total.tipsReceived += bartenderTipOut;
				} else if (member.position.toLowerCase() === 'runner') {
					total.tipsReceived += runnerTipOut;
				} else if (member.position.toLowerCase() === 'host') {
					total.tipsReceived += hostTipOut;
				}
			}
		}
	}
};

export const handleDailyTotalDeletion = (deletedTotal, teamMembers) => {
	// Find the server's daily total for the deleted day
	const server = teamMembers.find(
		(member) =>
			member.position === 'Server' &&
			member.dailyTotals.some((total) => moment(total.date).isSame(moment(deletedTotal.date), 'day'))
	);

	let serverTotal;

	if (server) {
		const serverTotal = server.dailyTotals.find((total) =>
			moment(total.date).isSame(moment(deletedTotal.date), 'day')
		);

		if (serverTotal) {
			// Subtract the tip outs for the deleted day from the server's total tip outs
			serverTotal.totalTipOut -=
				serverTotal.bartenderTipOuts + serverTotal.runnerTipOuts + serverTotal.hostTipOuts;
		}
	}

	// Find the bartenders, runners, and hosts who worked on the deleted day
	const otherStaff = teamMembers.filter(
		(member) =>
			['Bartender', 'Runner', 'Host'].includes(member.position) &&
			member.dailyTotals.some((total) => moment(total.date).isSame(moment(deletedTotal.date), 'day'))
	);

	otherStaff.forEach((member) => {
		const memberTotal = member.dailyTotals.find((total) =>
			moment(total.date).isSame(moment(deletedTotal.date), 'day')
		);

		if (memberTotal && serverTotal) {
			// Subtract the tip outs they received for the deleted day from their total tips received
			if (member.position === 'Bartender') {
				memberTotal.tipsReceived -= Number(serverTotal.barSales) * tipOutPercentages.Bartender;
			} else if (member.position === 'Runner') {
				memberTotal.tipsReceived -= Number(serverTotal.foodSales) * tipOutPercentages.Runner;
			} else if (member.position === 'Host') {
				memberTotal.tipsReceived -= Number(serverTotal.foodSales) * tipOutPercentages.Host;
			}
		}
	});
};
