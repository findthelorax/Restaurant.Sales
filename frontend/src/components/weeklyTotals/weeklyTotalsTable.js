import React, { useContext, useMemo } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import '../../App/App.css';
import moment from 'moment';
import WeeklyTotalsTableRender from './weeklyTotalsTableRender';
import { titleToPropName, titles, formatUSD } from '../../hooks/salesTotalsLogic';

function WeeklyTotalsTable({ selectedDate, setSelectedDate }) {
	const { teamMembers } = useContext(TeamMembersContext);
	const date = selectedDate;

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const selectedWeeklyTotals = useMemo(() => {
		const totals = Array(7)
			.fill(0)
			.map(() => {
				const dayTotal = {};
				Object.values(titleToPropName).forEach((propName) => {
					dayTotal[propName] = 0;
				});
				return dayTotal;
			});

		teamMembers.forEach((member) => {
			member.dailyTotals.forEach((total) => {
				const totalDate = moment.utc(total.date);
				const selectedWeekStart = moment.utc(selectedDate).startOf('week');
				const selectedWeekEnd = moment.utc(selectedWeekStart).endOf('week');

				if (totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd)) {
					const dayOfWeek = totalDate.day();
					Object.keys(titleToPropName).forEach((key) => {
						totals[dayOfWeek][titleToPropName[key]] += total[titleToPropName[key]] || 0;
					});
				}
			});
		});

		return totals;
	}, [teamMembers, selectedDate]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const columns = [
		{ field: 'salesTips', headerName: 'Sales / Tips', width: 130 },
		...daysOfWeek.map((day, index) => {
			const date = moment(selectedDate).startOf('week').add(index, 'days').format('MM/DD');
			return { field: day, headerName: `${day} ${date}`, width: 110 };
		}),
		{ field: 'total', headerName: 'Total', width: 100 },
	];

	const rows = titles.map((title, i) => {
		const row = { id: i, salesTips: title };
		selectedWeeklyTotals.forEach((total, index) => {
			row[daysOfWeek[index]] = formatUSD(total[titleToPropName[title]]);
		});
		row.total = formatUSD(selectedWeeklyTotals.reduce((sum, total) => sum + total[titleToPropName[title]], 0));
		return row;
	});

	return (
		<WeeklyTotalsTableRender
			teamMembers={teamMembers}
			date={date}
			handleDateChange={handleDateChange}
			rows={rows}
			columns={columns}
		/>
	);
}

export { WeeklyTotalsTable };