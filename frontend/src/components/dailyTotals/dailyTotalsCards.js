import { useMemo, useContext } from 'react';
import moment from 'moment';
import { calculateDailySalesDifferences } from '../../hooks/salesTotalsLogic';
import { DailyFoodSalesCardRender, DailyBarSalesCardRender } from '../dailyTotals/dailyTotalsCardsRender';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';

function DailyFoodSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);
	const teamMembersWithTotals = useMemo(() => {
		const selectedDay = moment(selectedDate).format('YYYY-MM-DD');

		return teamMembers
			.map((member) => {
				const dailyTotals = member.dailyTotals.filter((total) => {
					const totalDate = moment(total.date).local().format('YYYY-MM-DD');
					return totalDate === selectedDay;
				});
				return { ...member, dailyTotals };
			})
			.filter((member) => member.dailyTotals.length > 0);
	}, [teamMembers, selectedDate]);

	const allDailyTotals = teamMembersWithTotals.flatMap((member) => member.dailyTotals);
	const totalFoodSales = allDailyTotals.reduce((sum, total) => sum + total.foodSales, 0);
	const salesDifferences = calculateDailySalesDifferences(allDailyTotals);

	return (
		<DailyFoodSalesCardRender
		selectedDate={selectedDate}
		totalFoodSales={totalFoodSales}
			salesDifferences={salesDifferences}
			sx={salesDifferences.foodSales?.sx}
		/>
	);
}

function DailyBarSalesCard({ selectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);
	const teamMembersWithTotals = useMemo(() => {
		const selectedDay = moment(selectedDate).format('YYYY-MM-DD');

		return teamMembers.map((member) => {
			const dailyTotals = member.dailyTotals.filter((total) => {
				const totalDate = moment(total.date).local().format('YYYY-MM-DD');
				return totalDate === selectedDay;
			});
			return { ...member, dailyTotals };
		});
	}, [teamMembers, selectedDate]);

	const allDailyTotals = teamMembersWithTotals.flatMap((member) => member.dailyTotals);
	const totalBarSales = allDailyTotals.reduce((sum, total) => sum + total.barSales, 0);
	const salesDifferences = calculateDailySalesDifferences(allDailyTotals);

	return (
		<DailyBarSalesCardRender
		selectedDate={selectedDate}
		totalBarSales={totalBarSales}
			salesDifferences={salesDifferences}
			sx={salesDifferences.barSales?.sx}
		/>
	);
}

export { DailyFoodSalesCard, DailyBarSalesCard };