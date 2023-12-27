import axios from 'axios';

//* Users
export const addUser = async (username, password) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users`,
			{ username, password },
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async (userId) => {
	try {
		await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`);
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (userId, updates) => {
	try {
		const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, updates);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getUser = async (userId) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getUsers = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//* Profile

export const addProfile = async (profileData) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/profile`, profileData, {
			withCredentials: true,
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			// Redirect to login page
			window.location.href = '/login';
		} else {
			throw new Error('An error occurred while creating the profile.');
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export const deleteProfile = async () => {
	try {
		const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/profile`, {
			withCredentials: true,
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			// Redirect to login page
			window.location.href = '/login';
		} else {
			throw new Error('An error occurred while deleting the profile.');
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export const updateProfile = async (profileData) => {
	try {
		const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/profile`, profileData, {
			withCredentials: true,
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			// Redirect to login page
			window.location.href = '/login';
		} else {
			throw new Error('An error occurred while updating the profile.');
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

export const getProfile = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, { withCredentials: true });

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			// Redirect to login page
			window.location.href = '/login';
		} else {
			throw new Error('An error occurred while fetching the profile.');
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};