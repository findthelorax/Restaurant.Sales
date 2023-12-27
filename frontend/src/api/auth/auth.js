import axios from 'axios';

//* Auth

export const signup = async (username, password, role) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/signup`,
			{ username, password, role },
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export async function login(username, password) {
	const response = await axios.post('/login', { username, password });

	// Set the token in the Authorization header for future requests
	axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

	// Assuming the server includes the role in the response
	const { role } = response.data;

	// Set the role in local storage for future reference
	localStorage.setItem('userRole', role);
	console.log("🚀 ~ file: api.js:41 ~ login ~ role:", role)

	return response.data;
}

export const logout = async () => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`, {}, { withCredentials: true });
		return response.data;
	} catch (error) {
		throw error;
	}
};