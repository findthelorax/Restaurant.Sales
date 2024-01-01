import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { DeleteDTButton } from '../../components/deleteButton';
import { DeleteDailyTotalsButton } from '../deleteButton';

function DailyTotalsTableRender({ rows, columns, frameworkComponents }) {
	const [gridApi, setGridApi] = React.useState(null);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	const defaultColDef = {
		sortable: true,
		filter: true,
		menuTabs: ['filterMenuTab'],
		filterParams: {
			buttons: ['reset', 'apply'],
			closeOnApply: true,
			suppressMenu: false, // this is the key to show filter icon in header always
		},
	};

	const gridOptions = {
		defaultColDef,
		columnDefs: columns,
		onGridReady: onGridReady,
		rowData: rows,
		rowSelection: 'multiple',
		pagination: true,
		paginationPageSize: 20,
		modules: AllCommunityModules,
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
			<AgGridReact
				{...gridOptions}
				frameworkComponents={{ ...frameworkComponents, deleteDailyTotal: DeleteDailyTotalsButton }}
			/>
		</div>
	);
}

export { DailyTotalsTableRender };