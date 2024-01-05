import { useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { prepareDailyTotals } from '../dailyTotals/prepareDailyTotals';
import { submitDailyTotalToServer } from '../../api/salesTotals';

export const useSubmitDailyTotals = () => {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);

	const submitDailyTotals = async (selectedTeamMember, dailyTotal) => {

		const teamMemberExists = teamMembers.some((member) => member._id === selectedTeamMember._id);

		if (!teamMemberExists) {
			console.error('Selected team member does not exist in the database.');
			return;
		}

		// Filter the teamMembers to only include members of the same team
		const sameTeamMembers = teamMembers.filter((member) => member.team === selectedTeamMember.team);

		const newDailyTotals = prepareDailyTotals(selectedTeamMember, dailyTotal, sameTeamMembers, 'submit');

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