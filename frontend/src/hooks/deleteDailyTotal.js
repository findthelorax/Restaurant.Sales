import { useCallback, useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { TeamMembersContext } from '../contexts/TeamMembersContext'; // import TeamContext
import { deleteDailyTotalFromServer } from '../api/salesTotals';
import { FormattedDate } from '../hooks/formatDate';

export const useDeleteDailyTotal = (fetchAllDailyTotals, setRefreshDailyTotals) => {
    const { showError } = useContext(ErrorContext);
    const { teamMembers, setTeamMembers } = useContext(TeamMembersContext); // use setTeam from TeamContext

    return useCallback(
        async (teamMember, dailyTotal) => {
            const confirmation = window.confirm(
                `ARE YOU SURE YOU WANT TO DELETE THE DAILY TOTAL FOR:\n\n${teamMember.teamMemberFirstName}\n\n${teamMember.teamMemberLastName}		ON:		${FormattedDate(
                    dailyTotal.date
                ).toUpperCase()}?`
            );
            if (!confirmation) {
                return;
            }

            try {
                if (!teamMember._id || !dailyTotal._id) {
                    showError(`Failed to delete daily total.`);
                    return;
                }

                const response = await deleteDailyTotalFromServer(teamMember._id, dailyTotal._id);
                console.log(response);
                setRefreshDailyTotals((prevState) => !prevState); // add this line
                if (response.status === 200) {
                    // create a new team array with the updated team member
                    const newTeamMembers = teamMembers.map(member => 
                        member._id === teamMember._id 
                            ? { ...member, dailyTotals: member.dailyTotals.filter(total => total.date !== dailyTotal._id) } 
                            : member
                    );
                    setTeamMembers(newTeamMembers); // set the new team array
                    fetchAllDailyTotals();
                }
            } catch (error) {
                showError(`Error deleting daily total: ${error.message}`);
            }
        },
        [showError, fetchAllDailyTotals, setRefreshDailyTotals, teamMembers, setTeamMembers]
    );
};