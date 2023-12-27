import axios from 'axios';

//* Databsase
export const addDatabase = async (databaseName) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/addDatabase`, {
			name: databaseName,
		});
		return response.data;
	} catch (error) {
		console.error(`Error adding database: ${error.message}`, error);
		throw error;
	}
};

export const getDatabases = async () => {
	const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getDatabases`);
	return response.data.databases;
};

export const deleteDatabase = async (databaseName) => {
	await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/deleteDatabase/${databaseName}`);
};