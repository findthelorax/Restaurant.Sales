import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

function WeeklyTotalsTableRender({ teamMembers, date, handleDateChange, rows, columns }) {
	const [gridApi, setGridApi] = useState(null);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	const onExportButtonClick = () => {
		gridApi.exportDataAsCsv();
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
			<button onClick={onExportButtonClick}>Export to CSV</button>
			<AgGridReact
				onGridReady={onGridReady}
				rowData={rows}
				columnDefs={columns}
				defaultColDef={{
					resizable: true,
				}}
			/>
		</div>
	);
}

export default WeeklyTotalsTableRender;