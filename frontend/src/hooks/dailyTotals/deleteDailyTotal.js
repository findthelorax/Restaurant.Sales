import { useCallback, useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext'; // import TeamContext
import { deleteDailyTotalFromServer } from '../../api/salesTotals';
import { FormattedDate } from '../formatDate';
import { handleDailyTotalDeletion } from '../tipOuts';

export const useDeleteDailyTotal = (fetchAllDailyTotals, setRefreshDailyTotals) => {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext); // use setTeam from TeamContext

	return useCallback(
		async (teamMember, dailyTotal) => {
			console.log("🚀 ~ file: deleteDailyTotal.js:11 ~ teamMember:", teamMember)
			console.log("🚀 ~ file: deleteDailyTotal.js:11 ~ dailyTotal:", dailyTotal)
			const confirmation = window.confirm(
				`ARE YOU SURE YOU WANT TO DELETE THE DAILY TOTAL FOR:\n\n${teamMember.teamMemberFirstName}\n\n${
					teamMember.teamMemberLastName
				}		ON:		${FormattedDate(dailyTotal.date).toUpperCase()}?`
			);
			if (!confirmation) {
				return;
			}

			try {
				if (!teamMember._id || !dailyTotal._id) {
					console.log('Failed to delete daily total.'); // log error to console
					alert('Failed to delete daily total.'); // show error to user
					return;
				}

				const response = await deleteDailyTotalFromServer(teamMember._id, dailyTotal._id);
				console.log(response);
				setRefreshDailyTotals((prevState) => !prevState); // add this line
				if (response.status === 200) {

					handleDailyTotalDeletion(dailyTotal, teamMembers);

					// Find the index of the team member whose daily total was deleted
					const index = teamMembers.findIndex((member) => member._id === teamMember._id);

					if (index !== -1) {
						// Create a new copy of the team member with the deleted daily total removed
						const updatedTeamMember = {
							...teamMembers[index],
							dailyTotals: teamMembers[index].dailyTotals.filter((total) => total._id !== dailyTotal._id),
						};

						// Create a new team members array with the updated team member
						const newTeamMembers = [...teamMembers];
						newTeamMembers[index] = updatedTeamMember;

						setTeamMembers(newTeamMembers); // set the new team array
						console.log('🚀 ~ file: deleteDailyTotal.js:40 ~ newTeamMembers:', newTeamMembers);
						fetchAllDailyTotals();
					}
				}
			} catch (error) {
				console.log(`Error deleting daily total: ${error.message}`); // log error to console
				alert(`Error deleting daily total: ${error.message}`); // show error to user
			}
		},
		[fetchAllDailyTotals, setRefreshDailyTotals, teamMembers, setTeamMembers]
	);
};
