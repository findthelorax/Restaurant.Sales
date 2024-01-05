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
	console.log("🚀 ~ file: teamMembers.js:30 ~ updateTeamMember ~ updates:", updates)
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

export const getAllTeamMembers = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers`);
		return response.data;
	} catch (error) {
		console.error('Error geting team members:', error);
		throw error;
	}
};

//* Work Schedule
export const createWorkSchedule = async (id, workSchedule) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule`, { workSchedule });
		return response.data;
	} catch (error) {
		console.error(`Error creating work schedule: ${error.message}`, error);
		throw error.response && error.response.data.error ? error.response.data.error : error;
	}
};

export const addWorkDate = async (id, workDate) => {
	try {
		const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule`, { workDate });
		return response.data;
	} catch (error) {
		console.error(`Error adding work date: ${error.message}`, error);
		throw error.response && error.response.data.error ? error.response.data.error : error;
	}
};

export const getWorkSchedule = async (id) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule`);
		return response.data;
	} catch (error) {
		console.error(`Error getting work schedule: ${error.message}`, error);
		throw error;
	}
};

export const updateWorkDate = async (id, oldWorkDate, newWorkDate) => {
	try {
		await axios.put(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule/delete`, { workDate: oldWorkDate });
		const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule`, { workDate: newWorkDate });
		return response.data;
	} catch (error) {
		console.error(`Error updating work date: ${error.message}`, error);
		throw error.response && error.response.data.error ? error.response.data.error : error;
	}
};

export const deleteWorkDate = async (id, workDate) => {
	try {
		const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/teamMembers/${id}/workSchedule/delete`, { workDate });
		return response.data;
	} catch (error) {
		console.error(`Error deleting work date: ${error.message}`, error);
		throw error.response && error.response.data.error ? error.response.data.error : error;
	}
};