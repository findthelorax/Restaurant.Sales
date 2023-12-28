import React, { useContext } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { WeeklyBarSalesCardRender, WeeklyFoodSalesCardRender } from './weeklyTotalsCardsRender';
import { calculateWeeklySalesDifferences } from '../../hooks/salesTotalsLogic';

export function WeeklyFoodSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);

	const selectedWeekStart = moment(selectedDate).startOf('week');
	const selectedWeekEnd = moment(selectedWeekStart).endOf('week');

	const allWeeklyTotals = teamMembers.flatMap((member) =>
		member.weeklyTotals.filter((total) => {
			const totalDate = moment(total.date);
			return totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd);
		})
	);
	console.log('🚀 ~ file: weeklyTotalsCards.js:19 ~ WeeklyFoodSalesCard ~ allWeeklyTotals:', allWeeklyTotals);

	const totalWeeklyFoodSales = allWeeklyTotals.reduce((sum, total) => sum + total.foodSales, 0);
	console.log("🚀 ~ file: weeklyTotalsCards.js:22 ~ WeeklyFoodSalesCard ~ totalWeeklyFoodSales:", totalWeeklyFoodSales)
	const salesDifferences = calculateWeeklySalesDifferences(totalWeeklyFoodSales);
	console.log('🚀 ~ file: weeklyTotalsCards.js:23 ~ WeeklyFoodSalesCard ~ salesDifferences:', salesDifferences);

	return <WeeklyFoodSalesCardRender
    selectedDate={selectedDate}
    salesDifferences={salesDifferences}
    totalWeeklyFoodSales={totalWeeklyFoodSales}
    />;
}

export function WeeklyBarSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);

	const selectedWeekStart = moment(selectedDate).startOf('week');
	const selectedWeekEnd = moment(selectedWeekStart).endOf('week');

	const allWeeklyTotals = teamMembers.flatMap((member) =>
		member.weeklyTotals.filter((total) => {
			const totalDate = moment(total.date);
			return totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd);
		})
	);

    const totalWeeklyBarSales = allWeeklyTotals.reduce((sum, total) => sum + total.barSales, 0);
	const salesDifferences = calculateWeeklySalesDifferences(totalWeeklyBarSales);

	return (
		<WeeklyBarSalesCardRender
			selectedDate={selectedDate}
            salesDifferences={salesDifferences}
            totalWeeklyBarSales={totalWeeklyBarSales}
		/>
	);
}