import { addTeamMember, deleteTeamMember } from '../api/teamMembers';

export const addTeamMemberToTeam = (teamMemberFirstName, teamMemberLastName, position, teamMembers, setTeamMembers, clearInputs) => {
	return async () => {
		if (teamMemberFirstName && teamMemberLastName && position) {
			try {
				const duplicate = teamMembers.find(member => 
					member.teamMemberFirstName.toLowerCase() === teamMemberFirstName.toLowerCase() && 
					member.teamMemberLastName.toLowerCase() === teamMemberLastName.toLowerCase() && 
					member.position.toLowerCase() === position.toLowerCase()
				);
				if (duplicate) {
					alert('A member with this name and position already exists.');
					return;
				}
				const newMember = await addTeamMember(teamMemberFirstName, teamMemberLastName, position);
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
			console.error('Error deleting team member:', error);
			alert('Failed to delete team member');
		}
	};
};