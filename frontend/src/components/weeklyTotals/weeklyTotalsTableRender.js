import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export default function WeeklyTotalsTableRender({ rows, columns }) {
	return (
		<div
			className="ag-theme-quartz-dark"
			style={{
				height: '500px',
				width: '100%',
			}}
		>
			<AgGridReact rowData={rows} columnDefs={columns} domLayout="autoHeight" />
		</div>
	);
}
