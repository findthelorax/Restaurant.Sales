import { useState, useCallback } from 'react';
import { getAllTeamMembers } from '../../api/teamMembers'; // Replace with your actual API function

export const useGetAllTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    const fetchAllTeamMembers = useCallback(async () => {
        try {
            const allTeamMembers = await getAllTeamMembers();
            setTeamMembers(allTeamMembers);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }, []);

    return { teamMembers, fetchAllTeamMembers };
};