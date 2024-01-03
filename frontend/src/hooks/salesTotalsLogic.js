import moment from 'moment';
import { success, error } from '../theme/colors';

const titleToPropName = {
	'Food Sales': 'foodSales',
	'Bar Sales': 'barSales',
	'Non-Cash Tips': 'nonCashTips',
	'Cash Tips': 'cashTips',
	'Bar Tip Outs': 'barTipOuts',
	'Runner Tip Outs': 'runnerTipOuts',
	'Host Tip Outs': 'hostTipOuts',
	'Total Tip Out': 'totalTipOut',
	'Tips Received': 'tipsReceived',
	'Total Payroll Tips': 'totalPayrollTips',
};

const titles = Object.keys(titleToPropName);

const formatUSD = (value) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	return formatter.format(value);
};

function isDateInRange(date, start, end) {
	const dateMoment = moment(date);
	return dateMoment.isBetween(start, end, 'day', '[]');
}

function calculateSales(totals, salesType, start, end, isWeekly = false) {
	if (!Array.isArray(totals)) {
		console.error('Invalid argument: totals must be an array');
		return 0;
	}

	return totals.reduce((total, totalItem) => {
		if (isWeekly) {
			const weekStart = moment.utc(totalItem.weekStart);
			const weekEnd = moment.utc(totalItem.weekEnd);
			if (isDateInRange(weekStart, start, end) && isDateInRange(weekEnd, start, end)) {
				return total + (Number(totalItem[salesType]) || 0);
			}
		} else {
			const date = moment.utc(totalItem.date);
			if (isDateInRange(date, start, end)) {
				return total + (Number(totalItem[salesType]) || 0);
			}
		}
		return total;
	}, 0);
}

function calculateYesterdaySales(dailyTotals, salesType) {
	const yesterdayStart = moment().subtract(1, 'day').startOf('day');
	const yesterdayEnd = moment().subtract(1, 'day').endOf('day');
	return calculateSales(dailyTotals, salesType, yesterdayStart, yesterdayEnd, false);
}

function calculateTodaySales(dailyTotals, salesType) {
	const todayStart = moment().startOf('day');
	const todayEnd = moment().endOf('day');
	return calculateSales(dailyTotals, salesType, todayStart, todayEnd, false);
}

function calculateLastWeekSales(weeklyTotals, salesType) {
	const lastWeekStart = moment().subtract(1, 'week').startOf('week').utc();
	const lastWeekEnd = moment().subtract(1, 'week').endOf('week').endOf('day').utc();
	return calculateSales(weeklyTotals, salesType, lastWeekStart, lastWeekEnd, true);
}

function calculateThisWeekSales(weeklyTotals, salesType) {
	const thisWeekStart = moment().startOf('week').utc();
	const thisWeekEnd = moment().endOf('week').endOf('day').utc();
	return calculateSales(weeklyTotals, salesType, thisWeekStart, thisWeekEnd, true);
}

function calculateWeeklySalesDifferences(weeklyTotals) {
	if (!weeklyTotals || weeklyTotals.length === 0) return {};

	const salesTypes = ['barSales', 'foodSales'];
	const differences = {};

	salesTypes.forEach((salesType) => {
		const lastWeekSales = calculateLastWeekSales(weeklyTotals, salesType);
		const thisWeekSales = calculateThisWeekSales(weeklyTotals, salesType);
		let differenceSales = 0;
		if (lastWeekSales !== 0) {
			differenceSales = ((thisWeekSales - lastWeekSales) / lastWeekSales) * 100;
		} else if (thisWeekSales > 0) {
			differenceSales = 100;
		}
		const positiveSales = differenceSales >= 0;
		const sxSales = { bgcolor: positiveSales ? success.main : error.main };

		differences[salesType] = {
			difference: differenceSales,
			positive: positiveSales,
			sx: sxSales,
		};
	});

	return differences;
}

function calculateDailySalesDifferences(dailyTotals) {
	if (!dailyTotals || dailyTotals.length === 0) return {};

	const salesTypes = ['barSales', 'foodSales'];
	const differences = {};

	salesTypes.forEach((salesType) => {
		const yesterdaySales = calculateYesterdaySales(dailyTotals, salesType);
		const todaySales = calculateTodaySales(dailyTotals, salesType);
		let differenceSales = 0;
		if (yesterdaySales !== 0) {
			differenceSales = ((todaySales - yesterdaySales) / yesterdaySales) * 100;
		} else if (todaySales > 0) {
			differenceSales = 100;
		}
		const positiveSales = differenceSales >= 0;
		const sxSales = { bgcolor: positiveSales ? success.main : error.main };

		differences[salesType] = {
			difference: differenceSales,
			positive: positiveSales,
			sx: sxSales,
		};
	});

	return differences;
}

export { titleToPropName, titles, formatUSD, calculateDailySalesDifferences, calculateWeeklySalesDifferences, calculateYesterdaySales, calculateTodaySales, calculateLastWeekSales, calculateThisWeekSales };