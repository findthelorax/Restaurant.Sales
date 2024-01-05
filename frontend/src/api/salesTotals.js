import axios from 'axios';

//* Daily Totals
export const getOneDailyTotal = async (teamMemberId, dailyTotalId) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/dailyTotals/${dailyTotalId}`
		);
		return response.data;
	} catch (error) {
		console.error(`Error getting one daily total: ${error.message}`);
		throw error;
	}
};

export const updateDailyTotal = async (teamMemberId, dailyTotalId, updatedDailyTotal) => {
	console.log("🚀 ~ file: salesTotals.js:17 ~ updateDailyTotal ~ teamMemberId:", teamMemberId)
	console.log("🚀 ~ file: salesTotals.js:18 ~ updateDailyTotal ~ dailyTotalId:", dailyTotalId)
	console.log("🚀 ~ file: salesTotals.js:19 ~ updateDailyTotal ~ updatedDailyTotal:", updatedDailyTotal)
	try {
		const response = await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/dailyTotals/${dailyTotalId}`,
			updatedDailyTotal
		);
		return response.data;
	} catch (error) {
		console.error(`Error updating daily total: ${error.message}`);
		throw error;
	}
};

export const getAllDailyTotals = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers/allDailyTotals`);
		return response.data;
	} catch (error) {
		console.error(`Error getting daily totals: ${error.message}`);
		throw error;
	}
};

export const submitDailyTotalToServer = async (teamMemberId, dailyTotals) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/dailyTotals`,
			dailyTotals
		);
		return response.data;
	} catch (error) {
		console.error(`Error submitting daily totals: ${error.message}`);
		throw error;
	}
};

export const deleteDailyTotalFromServer = async (teamMemberId, dailyTotalId) => {
	try {
		const response = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/dailyTotals/${dailyTotalId}`
		);
		return response.data;
	} catch (error) {
		console.error(`Error deleting daily total: ${error.message}`);
		throw error;
	}
};

//* Weekly Totals
export const getWeeklyTotal = async (teamMemberId, week) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/weeklyTotals/${week}`
		);
		return response.data;
	} catch (error) {
		console.error(`Error getting weekly total: ${error.message}`);
		throw error;
	}
};

export const getAllWeeklyTotals = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/teamMembers/allWeeklyTotals`);
		return response.data;
	} catch (error) {
		console.error(`Error geting daily totals: ${error.message}`);
		throw error;
	}
};

export const createWeeklyTotal = async (teamMemberId, weeklyTotal) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/weeklyTotals`,
			weeklyTotal
		);
		return response.data;
	} catch (error) {
		console.error(`Error creating weekly total: ${error.message}`);
		throw error;
	}
};

export const deleteWeeklyTotal = async (teamMemberId, week) => {
	try {
		const response = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/weeklyTotals/${week}`
		);
		return response.data;
	} catch (error) {
		console.error(`Error deleting weekly total: ${error.message}`);
		throw error;
	}
};

export const updateWeeklyTotal = async (teamMemberId, week, updatedWeeklyTotal) => {
	try {
		const response = await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/weeklyTotals/${week}`,
			updatedWeeklyTotal
		);
		return response.data;
	} catch (error) {
		console.error(`Error updating weekly total: ${error.message}`);
		throw error;
	}
};

export const updateWeeklyTotals = async (teamMemberId, dailyTotals) => {
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/teamMembers/${teamMemberId}/weeklyTotals`,
			dailyTotals,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};