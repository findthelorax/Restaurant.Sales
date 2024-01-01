import React, { createContext, useState, useEffect } from 'react';
import { getTeamMembers, getTeamMember } from '../api/teamMembers';

export const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
	const [teamMembers, setTeamMembers] = useState([]);

	useEffect(() => {
		const fetchTeamMembers = async () => {
			try {
				const allTeamMembers = await getTeamMembers();
				setTeamMembers(allTeamMembers);
			} catch (error) {
				console.log('Error fetching team members', error);
				alert('Error fetching team members');
			}
		};

		fetchTeamMembers();
	}, []);

	return (
		<TeamMembersContext.Provider
			value={{
				teamMembers,
                setTeamMembers,
				getTeamMember,
			}}
		>
			{children}
		</TeamMembersContext.Provider>
	);
};