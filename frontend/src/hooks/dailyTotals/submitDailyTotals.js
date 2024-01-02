import { useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { prepareDailyTotals } from '../dailyTotals/prepareDailyTotals';
import { submitDailyTotalToServer } from '../../api/salesTotals';
// import { useUpdateTeamMemberTipOuts } from '../updateTeamMemberTipOuts';
// import { tipOuts } from '../tipOuts';

export const useSubmitDailyTotals = () => {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);

	const submitDailyTotals = async (selectedTeamMember, dailyTotal) => {

		const teamMemberExists = teamMembers.some((member) => member._id === selectedTeamMember._id);

		if (!teamMemberExists) {
			console.error('Selected team member does not exist in the database.');
			return;
		}

		const newDailyTotals = prepareDailyTotals(selectedTeamMember, dailyTotal, teamMembers);

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