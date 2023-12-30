import { useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { prepareDailyTotals } from '../dailyTotals/prepareDailyTotals';

export const useHandleSubmit = (submitDailyTotals, dailyTotals, selectedTeamMember, setSelectedTeamMember) => {
    const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { date, ...otherFields } = dailyTotals;
        // Prepare the daily totals
        const preparedDailyTotals = prepareDailyTotals(dailyTotals, selectedTeamMember, teamMembers);
        try {
            // Include the prepared daily totals when you submit
            const data = await submitDailyTotals({ date: date, ...preparedDailyTotals }, selectedTeamMember);
            console.log('Success:', data);
            // create a new team array with the updated team member
            const newTeam = teamMembers.map(member => 
                member._id === selectedTeamMember._id 
                    ? { ...member, dailyTotals: [...member.dailyTotals, { date: date, ...preparedDailyTotals }] } 
                    : member
            );
            setTeamMembers(newTeam);
        } catch (error) {
            console.error('Error:', error);
        }
        setSelectedTeamMember('');
    };

    return handleSubmit;
};