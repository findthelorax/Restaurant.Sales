import React, { createContext, useState, useEffect } from 'react';
import { getTeamMembers } from '../utils/api';

export const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const allTeamMembers = await getTeamMembers();
                setTeamMembers(allTeamMembers);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <TeamMembersContext.Provider value={{ teamMembers, setTeamMembers }}>
            {children}
        </TeamMembersContext.Provider>
    );
};