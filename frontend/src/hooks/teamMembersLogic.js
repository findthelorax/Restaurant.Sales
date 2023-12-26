import { addTeamMember, deleteTeamMember } from '../utils/api';

export const addTeamMemberToTeam = (teamMemberName, position, teamMembers, setTeamMembers, clearInputs) => {
	return async () => {
		if (teamMemberName && position) {
			if (teamMembers.some(member => member.name === teamMemberName && member.position === position)) {
				alert('A member with this name and position already exists.');
				return;
			}
			try {
				const newMember = await addTeamMember(teamMemberName, position);
				setTeamMembers((prevTeamMembers) => [...prevTeamMembers, newMember]);
				clearInputs();
			} catch (error) {
				console.error('Error adding team member:', error);
				alert('Failed to add team member');
			}
		} else {
			alert('Please enter both name and position');
		}
	};
};

export const deleteTeamMemberFromTeam = (setTeamMembers) => {
	return async (id, teamMemberName, position) => {
		const confirmation = window.confirm(
			`ARE YOU SURE YOU WANT TO DELETE:\n\n${
				teamMemberName ? teamMemberName.toUpperCase() : 'Unknown'
			} - ${position}?`
		);
		if (!confirmation) {
			return;
		}

		try {
			await deleteTeamMember(id);
			setTeamMembers((prevTeamMembers) => prevTeamMembers.filter((member) => member._id !== id));
		} catch (error) {
			console.error('Error deleting team member:', error);
			alert('Failed to delete team member');
		}
	};
};