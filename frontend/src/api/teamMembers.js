import axios from 'axios';

//* Team Members
export const addTeamMember = async (teamMemberFirstName, teamMemberLastName, position, teamId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/teamMembers`, {
            teamMemberFirstName,
            teamMemberLastName,
            position,
			teams: [teamId],
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding team member: ${error.message}`, error);
        throw error.response && error.response.data.error ? error.response.data.error : error;
    }
};

export const deleteTeamMember = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}`);
    } catch (error) {
        console.error(`Error deleting team member: ${error.message}`, error);
        throw error.response && error.response.data.error ? error.response.data.error : error;
    }
};

export const updateTeamMember = async (id, updates) => {
	try {
		const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}`, updates);
		return response.data;
	} catch (error) {
		console.error(`Error updating team member: ${error.message}`, error);
		throw error;
	}
}

export const getTeamMember = async (id) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error getting team member: ${error.message}`, error);
		throw error;
	}
};

export const getTeamMembers = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers`);
		return response.data;
	} catch (error) {
		console.error('Error geting team members:', error);
		throw error;
	}
};