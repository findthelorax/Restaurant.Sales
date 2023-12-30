import { useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { prepareDailyTotals } from '../dailyTotals/prepareDailyTotals';
import { submitDailyTotalToServer } from '../utils/api';

export const useSubmitDailyTotals = () => {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);

	const submitDailyTotals = async (dailyTotals, selectedTeamMember) => {
		const existingTeamMember = teamMembers.find((member) => member._id === selectedTeamMember._id);
		if (!existingTeamMember) {
			alert('Selected team member does not match an existing team member.');
			return;
		}
		if (selectedTeamMember.position === 'server') {
			dailyTotals.barTipOuts = tipOuts.bartender;
			dailyTotals.runnerTipOuts = tipOuts.runner;
			dailyTotals.hostTipOuts = tipOuts.host;

			for (const member of team) {
				console.log('🚀 ~ file: submitDailyTotals.js:28 ~ team:', team);
				console.log('🚀 ~ file: submitDailyTotals.js:28 ~ member:', member);
				const workedSameDate = member.dailyTotals.some((total) => total.date === dailyTotals.date);
				console.log('🚀 ~ file: submitDailyTotals.js:29 ~ workedSameDate:', workedSameDate);

				if (workedSameDate) {
					if (member.position === 'bartender') {
						await updateTeamMemberTipOuts(dailyTotals.date, 'bartender', tipOuts.bartender);
					} else if (member.position === 'host') {
						await updateTeamMemberTipOuts(dailyTotals.date, 'host', tipOuts.host);
					} else if (member.position === 'runner') {
						await updateTeamMemberTipOuts(dailyTotals.date, 'runner', tipOuts.runner);
					}
				}
			}
		} else {
			dailyTotals.barTipOuts = 0;
			dailyTotals.runnerTipOuts = 0;
			dailyTotals.hostTipOuts = 0;
		}

		const newDailyTotals = prepareDailyTotals(dailyTotals, selectedTeamMember, teamMembers);

		try {
			await submitDailyTotalToServer(selectedTeamMember._id, newDailyTotals);
			const newTeam = teamMembers.map((member) =>
				member._id === selectedTeamMember._id
					? { ...member, dailyTotals: [...member.dailyTotals, newDailyTotals] }
					: member
			);
			setTeamMembers(newTeam);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return submitDailyTotals;
};