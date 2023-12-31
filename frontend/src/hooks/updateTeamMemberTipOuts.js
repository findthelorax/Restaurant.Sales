import { useContext } from 'react';
import { TeamMembersContext } from '../contexts/TeamMembersContext';
import { submitDailyTotalToServer } from '../api/salesTotals';
import moment from 'moment';

export const useUpdateTeamMemberTipOuts = () => {
    const { teamMembers } = useContext(TeamMembersContext);

    const updateTeamMemberTipOuts = async (date, position, tipOuts, dailyTotals) => {
        console.log("🚀 ~ file: updateTeamMemberTipOuts.js:10 ~ updateTeamMemberTipOuts ~ dailyTotals:", dailyTotals)
        console.log("🚀 ~ file: updateTeamMemberTipOuts.js:10 ~ updateTeamMemberTipOuts ~ position:", position)
        console.log("🚀 ~ file: updateTeamMemberTipOuts.js:13 ~ tipOut:", tipOuts)
        const promises = teamMembers.map(async (member) => {
            const workedSameDate = member.dailyTotals.some(
                (total) => moment(total.date).format('YYYY-MM-DD') === moment(dailyTotals.date).format('YYYY-MM-DD')
            );
            if (workedSameDate && member.position === position) {
                const dailyTotalIndex = member.dailyTotals.findIndex((total) => total.date === date);
                member.dailyTotals[dailyTotalIndex].tipsReceived += tipOuts;
                return submitDailyTotalToServer(member._id, member.dailyTotals[dailyTotalIndex]);
            }
        });
        try {
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return updateTeamMemberTipOuts;
};