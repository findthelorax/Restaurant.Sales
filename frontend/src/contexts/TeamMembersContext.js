import React, { useState, createContext } from 'react';

export const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [refreshTeamMembers, setRefreshTeamMembers] = useState(false);

    return (
        <TeamMembersContext.Provider value={{ teamMembers, setTeamMembers, refreshTeamMembers, setRefreshTeamMembers }}>
            {children}
        </TeamMembersContext.Provider>
    );
};