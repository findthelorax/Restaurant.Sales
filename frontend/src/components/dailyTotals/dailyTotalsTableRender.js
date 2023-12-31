import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { DeleteDTButton } from '../../components/deleteButton';
import { DeleteDailyTotalsButton } from '../deleteButton';

function DailyTotalsTableRender({ rows, columns, frameworkComponents }) {
	const defaultColDef = {
		sortable: true,
		filter: true,
		menuTabs: ['filterMenuTab'],
	};

	return (
			<div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
				<AgGridReact
					rowData={rows}
					columnDefs={columns}
					defaultColDef={defaultColDef}
					frameworkComponents={{ ...frameworkComponents, delete: DeleteDailyTotalsButton }}
					/>
			</div>
	);
}

export { DailyTotalsTableRender };