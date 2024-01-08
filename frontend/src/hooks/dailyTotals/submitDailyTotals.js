import { useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { calculateTipOuts } from '../calculateTipOuts';
import { submitDailyTotalToServer } from '../../api/salesTotals';

export const useSubmitDailyTotals = () => {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);

	const submitDailyTotals = async (selectedTeamMember, dailyTotal) => {
		const teamMemberExists = teamMembers.some((member) => member._id === selectedTeamMember._id);

		if (!teamMemberExists) {
			console.error('Selected team member does not exist in the database.');
			return;
		}

		// Calculate the tip outs
		await calculateTipOuts(selectedTeamMember, dailyTotal.date, dailyTotal.foodSales, dailyTotal.barSales, dailyTotal.nonCashTips, dailyTotal.cashTips, teamMembers);

		try {
			await submitDailyTotalToServer(selectedTeamMember._id, dailyTotal);
			const newTeam = teamMembers.map((member) =>
				member._id === selectedTeamMember._id
					? { 
						...member, 
						dailyTotals: [...member.dailyTotals, dailyTotal],
						workSchedule: [...member.workSchedule, dailyTotal.date] // Add the date to the workSchedule
					}
					: member
			);
			setTeamMembers(newTeam);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return submitDailyTotals;
};