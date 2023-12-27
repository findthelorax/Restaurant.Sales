import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { DeleteTMButton } from '../deleteButton';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function TeamMembersListRender({ teamByPosition, deleteTeamMember }) {
	const [gridApi, setGridApi] = React.useState(null);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	const onSearchChange = (event) => {
		const value = event.target.value;
		gridApi.setQuickFilter(value);
	};
	
	const exportData = () => {
		gridApi.exportDataAsCsv();
	};
	
	const columns = [
		{
			headerName: 'Info',
			children: [
				{ 
					headerComponentFramework: () => <input type="text" onChange={onSearchChange} placeholder="Search..." />,
					children: [
						{ field: 'teamMemberName', headerName: 'Name', sortable: true, filter: true },
						{ field: 'position', headerName: 'Position', sortable: true, filter: true },
					]
				}
			]
		},
		{
			headerName: 'Contact',
			children: [
				{ field: 'phoneNumber', headerName: 'Phone Number', sortable: false, filter: true },
				{ field: 'email', headerName: 'Email', sortable: false, filter: true },
			]
		},
		{
			headerName: '',
			children: [
				{
					headerComponentFramework: () => <button onClick={exportData}>Export</button>,
					children: [
						{
							field: 'delete',
							headerName: 'Delete',
							sortable: false,
							filter: false,
							cellRenderer: 'DeleteTMButton',
							cellRendererParams: {
								onClick: deleteTeamMember,
								label: 'Delete',
							},
						},
					]
				}
			]
		},
	];

	const rows = Object.values(teamByPosition)
		.flat()
		.map((member) => ({
			...member,
			id: member._id,
			teamMemberName: member.teamMemberName ? capitalizeFirstLetter(member.teamMemberName) : 'Unknown',
		}));

	return (
		<div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
			<AgGridReact
				onGridReady={onGridReady}
				rowData={rows}
				columnDefs={columns}
				pagination={true}
				paginationPageSize={5}
				modules={AllCommunityModules}
			/>
		</div>
	);
}

export default TeamMembersListRender;