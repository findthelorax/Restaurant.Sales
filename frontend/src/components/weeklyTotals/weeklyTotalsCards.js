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

	const totalWeeklyFoodSales = allWeeklyTotals.reduce((sum, total) => sum + total.foodSales, 0);
	const salesDifferences = calculateWeeklySalesDifferences(allWeeklyTotals);

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
	const salesDifferences = calculateWeeklySalesDifferences(allWeeklyTotals);

	return (
		<WeeklyBarSalesCardRender
			selectedDate={selectedDate}
            salesDifferences={salesDifferences}
            totalWeeklyBarSales={totalWeeklyBarSales}
		/>
	);
}