import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAllTeamMembers, getTeamMember } from '../api/teamMembers';

export const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
	const [teamMembers, setTeamMembers] = useState([]);

	const fetchTeamMembers = useCallback(async () => {
		try {
			const allTeamMembers = await getAllTeamMembers();
			setTeamMembers(allTeamMembers);
		} catch (error) {
			console.log('Error fetching team members', error);
			alert('Error fetching team members');
		}
	}, []);

	useEffect(() => {
		fetchTeamMembers();
	}, [fetchTeamMembers]);

	return (
		<TeamMembersContext.Provider
			value={{
				teamMembers,
				setTeamMembers,
				getTeamMember,
				fetchTeamMembers,
			}}
		>
			{children}
		</TeamMembersContext.Provider>
	);
};