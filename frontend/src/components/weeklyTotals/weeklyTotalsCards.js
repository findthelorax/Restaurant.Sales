import React, { useContext } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { WeeklyBarSalesCardRender, WeeklyFoodSalesCardRender } from './weeklyTotalsCardsRender';
import { calculateThisWeekSales, calculateWeeklySalesDifferences } from '../../hooks/salesTotalsLogic';

export function WeeklyFoodSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);
	const selectedWeekStart = moment(selectedDate).startOf('week');
	const selectedWeekEnd = moment(selectedWeekStart).endOf('week');

	const selectedWeeklyTotals = teamMembers.flatMap((member) =>
		member.weeklyTotals.filter((total) => {
			const totalDate = moment(total.date);
			return totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd);
		})
	);

	const totalSelectedWeeklyFoodSales = calculateThisWeekSales(selectedWeeklyTotals, 'foodSales');
	const salesDifferences = calculateWeeklySalesDifferences(selectedWeeklyTotals);

	return (
		<WeeklyFoodSalesCardRender
			selectedDate={selectedDate}
			salesDifferences={salesDifferences}
			selectedWeeklyFoodSales={totalSelectedWeeklyFoodSales}
		/>
	);
}

export function WeeklyBarSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);
	const selectedWeekStart = moment(selectedDate).startOf('week');
	const selectedWeekEnd = moment(selectedWeekStart).endOf('week');

	const selectedWeeklyTotals = teamMembers.flatMap((member) =>
		member.weeklyTotals.filter((total) => {
			const totalDate = moment(total.date);
			return totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd);
		})
	);

	const totalSelectedWeeklyBarSales = selectedWeeklyTotals.reduce((sum, total) => sum + total.barSales, 0);
	const salesDifferences = calculateWeeklySalesDifferences(selectedWeeklyTotals);

	return (
		<WeeklyBarSalesCardRender
			selectedDate={selectedDate}
			salesDifferences={salesDifferences}
			selectedWeeklyBarSales={totalSelectedWeeklyBarSales}
		/>
	);
}