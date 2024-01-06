import { addTeamMember, deleteTeamMember } from '../../api/teamMembers';
import { prepareDailyTotals } from '../dailyTotals/prepareDailyTotals';

export const addTeamMemberToTeam = (teamMemberName, position, setTeam, clearInputs) => {
	return async () => {
		if (teamMemberName && position) {
			try {
				const newMember = await addTeamMember(teamMemberName, position);
				setTeam((prevTeam) => [...prevTeam, newMember]);
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

export const deleteTeamMemberFromTeam = (setTeam) => {
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
			setTeam((prevTeam) => {
				const updatedTeam = prevTeam.filter((member) => member._id !== id);
				// Get the team of the deleted member
				const teamOfDeletedMember = prevTeam.find((member) => member._id === id).team;
				// Filter the updated team to only include members of the same team
				const sameTeamMembers = updatedTeam.filter((member) => member.team === teamOfDeletedMember);
				// Recalculate daily totals for each remaining team member in the same team
				sameTeamMembers.forEach(member => {
					const updatedDailyTotals = prepareDailyTotals(member, member.dailyTotals, sameTeamMembers);
					member.dailyTotals = updatedDailyTotals;
				});
				return updatedTeam;
			});
		} catch (error) {
			console.error('Error deleting team member:', error);
			alert('Failed to delete team member');
		}
	};
};