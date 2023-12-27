import { useCallback, useContext } from 'react';
// import { ErrorContext } from '../contexts/ErrorContext';
import { TeamMembersContext } from '../contexts/TeamMembersContext'; // import TeamContext
import { deleteDailyTotalFromServer } from '../api/salesTotals';
import { FormattedDate } from '../hooks/formatDate';

export const useDeleteDailyTotal = (fetchAllDailyTotals, setRefreshDailyTotals) => {
    // const { setError } = useContext(ErrorContext);
    const { team, setTeam } = useContext(TeamMembersContext); // use setTeam from TeamContext

    return useCallback(
        async (teamMember, dailyTotal) => {
            const confirmation = window.confirm(
                `ARE YOU SURE YOU WANT TO DELETE THE DAILY TOTAL FOR:\n\n${teamMember.teamMemberFirstName.toUpperCase()}    ${teamMember.teamMemberFirstName.toUpperCase()} 	ON:		${FormattedDate(
                    dailyTotal.date
                ).toUpperCase()}?`
            );
            if (!confirmation) {
                return;
            }

            try {
                if (!teamMember._id || !dailyTotal._id) {
                    console.error('teamMember or daily total is undefined');
                    alert('Failed to delete daily total');
                    return;
                }

                const response = await deleteDailyTotalFromServer(teamMember._id, dailyTotal._id);
                console.log(response);
                setRefreshDailyTotals((prevState) => !prevState); // add this line
                if (response.status === 200) {
                    // create a new team array with the updated team member
                    const newTeam = team.map(member => 
                        member._id === teamMember._id 
                            ? { ...member, dailyTotals: member.dailyTotals.filter(total => total.date !== dailyTotal._id) } 
                            : member
                    );
                    setTeam(newTeam); // set the new team array
                    fetchAllDailyTotals();
                }
            } catch (error) {
                // setError(`Error deleting daily total: ${error.message}`);
                alert(`Failed to delete daily totals: ${error.message}`);
            }
        },
        [setError, fetchAllDailyTotals, setRefreshDailyTotals, team, setTeam]
    );
};