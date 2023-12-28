import React, { createContext, useState, useEffect } from 'react';
import { getTeams, addTeam, deleteTeam, updateTeam, addTeamMemberToTeam, removeTeamMemberFromTeam } from '../api/teams';

export const TeamContext = createContext();

export const TeamContextProvider = props => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams().then(setTeams);
    }, []);

    const createTeam = async (teamName) => {
        const newTeam = await addTeam(teamName);
        setTeams(prevTeams => [...prevTeams, newTeam]);
    };

    const removeTeam = async (teamId) => {
        await deleteTeam(teamId);
        setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    };

    const updateTeamData = async (teamId, updates) => {
        const updatedTeam = await updateTeam(teamId, updates);
        setTeams(prevTeams => prevTeams.map(team => team.id === teamId ? updatedTeam : team));
    };

    const addExistingTeamMemberToTeam = async (teamId, teamMemberId) => {
        const updatedTeam = await addTeamMemberToTeam(teamId, teamMemberId);
        setTeams(prevTeams => prevTeams.map(team => team.id === teamId ? updatedTeam : team));
    };

    const removeExistingTeamMemberFromTeam = async (teamId, teamMemberId) => {
        const updatedTeam = await removeTeamMemberFromTeam(teamId, teamMemberId);
        setTeams(prevTeams => prevTeams.map(team => team.id === teamId ? updatedTeam : team));
    };

    return (
        <TeamContext.Provider value={{ 
            teams, 
            addTeam: createTeam, 
            deleteTeam: removeTeam, 
            updateTeam: updateTeamData, 
            addTeamMemberToTeam: addExistingTeamMemberToTeam, 
            removeTeamMemberFromTeam: removeExistingTeamMemberFromTeam 
        }}>
            {props.children}
        </TeamContext.Provider>
    );
};