import React, { useContext, createContext, useState, useEffect } from 'react';
// import { getTeamMembers, addTeamMember, deleteTeamMember, updateTeamMember, getTeamMember } from '../api/teamMembers';
import { getTeamMembers, getTeamMember } from '../api/teamMembers';
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

	// const createTeamMember = async (teamMemberFirstName, teamMemberLastName, position) => {
	// 	if (teamMemberFirstName && teamMemberLastName && position) {
	// 		try {
    //             const duplicate = teamMembers.find(member => 
    //                 member.teamMemberFirstName.toLowerCase() === teamMemberFirstName.toLowerCase() && 
    //                 member.teamMemberLastName.toLowerCase() === teamMemberLastName.toLowerCase() && 
    //                 member.position.toLowerCase() === position.toLowerCase()
    //             );
    //             if (duplicate) {
    //                 alert('A member with this name and position already exists.');
    //                 return;
    //             }
	// 			const newTeamMember = await addTeamMember(teamMemberFirstName, teamMemberLastName, position);
	// 			setTeamMembers((prevTeamMembers) => [...prevTeamMembers, newTeamMember]);
	// 		} catch (error) {
	// 			console.error('Error adding team member:', error);
	// 			alert('Failed to add team member');
	// 		}
	// 	} else {
	// 		alert('Please enter both name and position');
	// 	}
	// };

	// const removeTeamMember = (id) => {
	// 	return async (id, teamMemberFirstName, teamMemberLastName, position) => {
	// 		const confirmation = window.confirm(
	// 			`ARE YOU SURE YOU WANT TO DELETE:\n\n${
	// 				teamMemberFirstName && teamMemberLastName
	// 					? (teamMemberFirstName + ' ' + teamMemberLastName).toUpperCase()
	// 					: 'Unknown'
	// 			} - ${position}?`
	// 		);
	// 		if (!confirmation) {
	// 			return;
	// 		}
	// 		try {
	// 			await deleteTeamMember(id);
	// 			setTeamMembers((prevTeamMembers) => prevTeamMembers.filter((teamMember) => teamMember.id !== id));
	// 		} catch (error) {
	// 			console.error('Error deleting team member:', error);
	// 			alert('Failed to delete team member');
	// 		}
	// 	};
	// };

	// const updateExistingTeamMember = async (id, updates) => {
	// 	try {
	// 		const updatedTeamMember = await updateTeamMember(id, updates);
	// 		setTeamMembers((prevTeamMembers) =>
	// 			prevTeamMembers.map((teamMember) => (teamMember.id === id ? updatedTeamMember : teamMember))
	// 		);
	// 	} catch (error) {
	// 		showError('Error updating team member');
	// 	}
	// };

	return (
		<TeamMembersContext.Provider
			value={{
				teamMembers,
				// addTeamMember: createTeamMember,
				// deleteTeamMember: removeTeamMember,
				// updateTeamMember: updateExistingTeamMember,
				getTeamMember,
			}}
		>
			{children}
		</TeamMembersContext.Provider>
	);
};
