import React, { useContext, createContext, useState, useEffect } from 'react';
import { getTeamMembers, addTeamMember, deleteTeamMember, updateTeamMember, getTeamMember } from '../api/teamMembers';
import { ErrorContext } from './ErrorContext';

export const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const { showError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const allTeamMembers = await getTeamMembers();
                setTeamMembers(allTeamMembers);
            } catch (error) {
                showError('Error fetching team members');
            }
        };

        fetchTeamMembers();
    }, [showError]);

    const createTeamMember = async (teamMemberFirstName, teamMemberLastName, position) => {
        try {
            const newTeamMember = await addTeamMember(teamMemberFirstName, teamMemberLastName, position);
            setTeamMembers(prevTeamMembers => [...prevTeamMembers, newTeamMember]);
        } catch (error) {
            showError('Error adding team member');
        }
    };

    const removeTeamMember = async (id) => {
        try {
            await deleteTeamMember(id);
            setTeamMembers(prevTeamMembers => prevTeamMembers.filter(teamMember => teamMember.id !== id));
        } catch (error) {
            showError('Error deleting team member');
        }
    };

    const updateExistingTeamMember = async (id, updates) => {
        try {
            const updatedTeamMember = await updateTeamMember(id, updates);
            setTeamMembers(prevTeamMembers => prevTeamMembers.map(teamMember => teamMember.id === id ? updatedTeamMember : teamMember));
        } catch (error) {
            showError('Error updating team member');
        }
    };

    return (
        <TeamMembersContext.Provider value={{ 
            teamMembers, 
            addTeamMember: createTeamMember, 
            deleteTeamMember: removeTeamMember, 
            updateTeamMember: updateExistingTeamMember, 
            getTeamMember 
        }}>
            {children}
        </TeamMembersContext.Provider>
    );
};