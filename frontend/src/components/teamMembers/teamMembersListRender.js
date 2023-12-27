import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridSearch, AgGridExport, DeleteTMButtonRender } from '../customAgGridHeader';
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function TeamMembersListRender({ teamByPosition, deleteTeamMember }) {
	// eslint-disable-next-line
	const [gridApi, setGridApi] = React.useState(null);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	const columns = [
		{
			field: 'team',
			headerName: 'Team',
			width: 130,
			filter: 'agTextColumnFilter',
			checkboxSelection: true,
		},
		{
			field: 'teamMemberLastName',
			headerName: 'Last Name',
			width: 130,
			filter: 'agTextColumnFilter',
		},
		{
			field: 'teamMemberFirstName',
			headerName: 'First Name',
			width: 130,
			filter: 'agTextColumnFilter',
		},
		{ field: 'position', headerName: 'Position', width: 130, filter: 'agTextColumnFilter' },
		{ field: 'phoneNumber', headerName: 'Phone Number', filter: 'agNumberColumnFilter' },
		{ field: 'email', headerName: 'Email' },
		{
			field: 'actions',
			headerName: 'Actions',
			headerComponent: AgGridExport,
			sortable: false,
			filter: AgGridSearch,        
			cellRenderer: DeleteTMButtonRender,
			cellRendererParams: {
				deleteMember: deleteTeamMember,
			},
		},
	];

	const rows = Object.values(teamByPosition)
    .flat()
    .map((member) => ({
        ...member,
        id: member._id,
        teamMemberFirstName: member.teamMemberFirstName ? capitalizeFirstLetter(member.teamMemberFirstName) : 'Unknown',
        teamMemberLastName: member.teamMemberLastName ? capitalizeFirstLetter(member.teamMemberLastName) : 'Unknown',
    }));

	const gridOptions = {
		defaultColDef: {
			filterParams: {
				buttons: ['reset', 'apply'],
				closeOnApply: true,
				suppressMenu: false, // this is the key to show filter icon in header always
			},
		},
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
			<AgGridReact {...gridOptions} />
		</div>
	);
}

export default TeamMembersListRender;