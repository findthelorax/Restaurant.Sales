import { useContext } from 'react';
import { addTeamMember, deleteTeamMember } from '../api/teamMembers';
import { ErrorContext } from '../contexts/ErrorContext';

export const useAddTeamMemberToTeam = (teamMemberFirstName, teamMemberLastName, position, teamMembers, setTeamMembers, clearInputs) => {
	const { showError } = useContext(ErrorContext);

	return async () => {
		if (teamMemberFirstName && teamMemberLastName && position) {
			try {
				const duplicate = teamMembers.find(member => 
					member.teamMemberFirstName.toLowerCase() === teamMemberFirstName.toLowerCase() && 
					member.teamMemberLastName.toLowerCase() === teamMemberLastName.toLowerCase() && 
					member.position.toLowerCase() === position.toLowerCase()
				);
				if (duplicate) {
					showError('A member with this name and position already exists.');
					return;
				}
				const newMember = await addTeamMember(teamMemberFirstName, teamMemberLastName, position);
				setTeamMembers((prevTeamMembers) => [...prevTeamMembers, newMember]);
				clearInputs();
			} catch (error) {
				showError(`Failed to add team member: ${error.message}`);
			}
		} else {
			showError(`Please enter both name and position.`);
		}
	};
};

export const useDeleteTeamMemberFromTeam = (setTeamMembers) => {
	const { showError } = useContext(ErrorContext);

	return async (id, teamMemberFirstName, teamMemberLastName, position) => {
		const confirmation = window.confirm(
			`ARE YOU SURE YOU WANT TO DELETE:\n\n${
				teamMemberFirstName && teamMemberLastName ? (teamMemberFirstName + ' ' + teamMemberLastName).toUpperCase() : 'Unknown'
			} - ${position}?`
		);
		if (!confirmation) {
			return;
		}

		try {
			await deleteTeamMember(id);
			setTeamMembers((prevTeamMembers) => prevTeamMembers.filter((member) => member._id !== id));
		} catch (error) {
			showError(`Failed to delete team member: ${error.message}`);
		}
	};
};