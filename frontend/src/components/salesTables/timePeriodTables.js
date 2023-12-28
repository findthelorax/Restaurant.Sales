import React from 'react';
import { DailyTotalsTable } from '../dailyTotals/dailyTotalsTable.js';
import { WeeklyTotalsTable } from '../weeklyTotals/weeklyTotalsTable.js';
import { MonthlyTotalsTable } from '../salesTables/monthlyTotals/monthlyTotalsTable.js';
import { YearlyTotalsTable } from '../salesTables/yearlyTotals/yearlyTotalsTable.js';

function TimePeriodTable({ timePeriod }) {
	switch (timePeriod) {
		case 'day':
			return <DailyTotalsTable />;
		case 'week':
			return <WeeklyTotalsTable />;
		case 'month':
			return <MonthlyTotalsTable />;
		case 'year':
			return <YearlyTotalsTable />;
		default:
			return <DailyTotalsTable />;
	}
}

export { TimePeriodTable };