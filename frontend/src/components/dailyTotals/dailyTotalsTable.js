import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { DailyTotalsTableRender } from '../dailyTotals/dailyTotalsTableRender';
import { useDeleteDailyTotal } from '../../hooks/dailyTotals/deleteDailyTotal';
import { DeleteDailyTotalsButton } from '../deleteButton';
import { AgGridSearch, AgGridExport } from '../customAgGridHeader';

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
	const { teamMembers, fetchTeamMembers } = useContext(TeamMembersContext);

	useEffect(() => {
		fetchTeamMembers();
	}, [fetchTeamMembers]);

	const rows = teamMembers.flatMap((teamMember) =>
		teamMember.dailyTotals.map((dailyTotal) => {
			const localDate = moment.utc(dailyTotal.date).format('MMM D, YYYY');
			return {
				teamMemberId: teamMember._id,
				_id: dailyTotal._id,
				date: localDate,
				key: `${teamMember._id}-${dailyTotal._id}`,
				teamMemberName: `${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName}`,
				teamMemberPosition: teamMember.position,
				...dailyTotal,
			};
		})
	);

	const columns = [
		{ field: 'teamMemberName', headerName: 'Name', pinned: 'left' },
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
					: moment.utc(data[key]).format('MMM D, YYYY'),
		})),
		{
			field: 'actions',
			headerName: 'Actions',
			headerComponent: AgGridExport,
			sortable: false,
			filter: AgGridSearch,
			cellRenderer: DeleteDailyTotalsButton,
			cellRendererParams: (params) => {
				return {
					deleteDailyTotal: deleteDailyTotal,
					params: params,
				};
			},
		},
	];

	return <DailyTotalsTableRender rows={rows} columns={columns} frameworkComponents={{ DeleteDailyTotalsButton }} />;
}

export { DailyTotalsTable };