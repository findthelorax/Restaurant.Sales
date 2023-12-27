import axios from 'axios';

//* Teams
export const addTeam = async (teamName) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/teams`, { teamName });
        return response.data;
    } catch (error) {
        console.error(`Error adding team: ${error.message}`);
        throw error;
    }
};

export const deleteTeam = async (teamId) => {
	try {
		const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/teams/${teamId}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting team: ${error.message}`);
		throw error;
	}
};

export const updateTeam = async (teamId, updates) => {
	try {
		const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/teams/${teamId}`, updates);
		return response.data;
	} catch (error) {
		console.error(`Error updating team: ${error.message}`);
		throw error;
	}
};

export const getTeams = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teams`);
		return response.data;
	} catch (error) {
		console.error(`Error getting teams: ${error.message}`);
		throw error;
	}
};

export const addTeamMemberToTeam = async (teamId, teamMemberId) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/teams/${teamId}/teamMembers`,
			{ teamMemberId }
		);
		return response.data;
	} catch (error) {
		console.error(`Error adding team member to team: ${error.message}`);
		throw error;
	}
};

export const removeTeamMemberFromTeam = async (teamId, teamMemberId) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/teams/${teamId}/removeTeamMember`,
			{ teamMemberId }
		);
		return response.data;
	} catch (error) {
		console.error(`Error removing team member from team: ${error.message}`);
		throw error;
	}
};