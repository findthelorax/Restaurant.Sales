import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { DailyTotalsTableRender } from '../dailyTotals/dailyTotalsTableRender';
import { useGetAllDailyTotals } from '../../hooks/dailyTotals/getAllDailyTotals';
import { useDeleteDailyTotal } from '../../hooks/dailyTotals/deleteDailyTotal';
import { DeleteDailyTotalsButton } from '../deleteButton';
import { DeleteHeader } from '../dailyTotals/deleteHeader';

const columnNames = {
	date: 'Date',
	foodSales: 'Food Sales',
	barSales: 'Bar Sales',
	nonCashTips: 'Non-Cash Tips',
	cashTips: 'Cash Tips',
	barTipOuts: 'Bar Tip Outs',
	runnerTipOuts: 'Runner Tip Outs',
	hostTipOuts: 'Host Tip Outs',
	totalTipOut: 'Total Tip Out',
	tipsReceived: 'Tips Received',
	totalPayrollTips: 'Total Payroll Tips',
};

function DailyTotalsTable() {
	const deleteDailyTotal = useDeleteDailyTotal();
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
	const { fetchAllDailyTotals } = useGetAllDailyTotals();

	useEffect(() => {
		fetchAllDailyTotals();
	}, [fetchAllDailyTotals]);

	const rows = teamMembers.flatMap((teamMember) =>
		teamMember.dailyTotals.map((dailyTotal) => {
			const localDate = moment.utc(dailyTotal.date).add(moment().utcOffset(), 'minutes').format('MMM D, YYYY');
			return {
				teamMemberId: teamMember._id,
				_id: dailyTotal._id,
				date: localDate,
				key: `${teamMember._id}-${dailyTotal._id}`,
				teamMemberFirstName: teamMember.teamMemberFirstName,
				teamMemberLastName: teamMember.teamMemberLastName,
				teamMemberPosition: teamMember.position,
				...dailyTotal,
			};
		})
	);

	const columns = [
        { field: 'teamMemberFirstName', headerName: 'First Name', pinned: 'left',},
        { field: 'teamMemberLastName', headerName: 'Last Name'},
		{ field: 'teamMemberPosition', headerName: 'Position', width: 120 },
		...Object.entries(columnNames).map(([key, name]) => ({
			field: key,
			headerName: name,
			width: 150,
			valueGetter: ({ data }) =>
				key !== 'date'
					? Number(data[key] || 0).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
					  })
					: moment(data[key]).format('MMM D, YYYY'),
		})),
	];

	columns.push({
		headerName: 'Delete',
		field: 'delete',
		// headerComponentFramework: DeleteHeader,
		// cellRenderer: DeleteDailyTotalsButton, // Directly reference the DeleteButton component
		width: 100,
	});

	// columns.push({
	// 	headerName: 'Delete',
	// 	field: 'delete',
	// 	cellRenderer: DeleteButton,
	// 	cellRendererParams: {
	// 		deleteDailyTotal: deleteDailyTotal,
	// 	},
	// 	width: 100,
	// });


	return <DailyTotalsTableRender rows={rows} columns={columns} />;
}

export { DailyTotalsTable };