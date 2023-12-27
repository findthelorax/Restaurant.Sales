import axios from 'axios';

//* Admins

// Admin registration
export const registerAdmin = async (username, password) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/admin/register`,
			{ username, password },
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createAdmin = async (username, password) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/admins`,
			{ username, password },
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteAdmin = async (adminId) => {
	try {
		await axios.delete(`${process.env.REACT_APP_SERVER_URL}/admins/${adminId}`);
	} catch (error) {
		throw error;
	}
};

export const updateAdmin = async (adminId, updates) => {
	try {
		const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admins/${adminId}`, updates);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAdmin = async (adminId) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admins/${adminId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAdmins = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admins`);
		return response.data;
	} catch (error) {
		throw error;
	}
};