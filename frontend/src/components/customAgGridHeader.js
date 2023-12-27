import React from 'react';
import { deleteTeamMemberFromTeam } from '../handlers/teamMembersConfirmations';

export function AgGridSearch({ api }) {
	const onSearchChange = (event) => {
		const value = event.target.value;
		api.setQuickFilter(value);
	};

	return (
		<div style={{ display: 'flex' }}>
			<input type="text" onChange={onSearchChange} placeholder="Search..." />
		</div>
	);
}

export function AgGridExport({ api }) {
    const exportData = () => {
        api.exportDataAsCsv();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ marginRight: '10px' }}>Actions:</span>
            <button onClick={exportData}>Export</button>

        </div>
    );
}

export const DeleteButtonRender = (props) => {
    console.log("🚀 ~ file: customAgGridHeader.js:32 ~ DeleteButtonRender ~ props.data:", props.data)
    const onButtonClick = async () => {
        // Delete team member
        try {
            const setTeamMembers = () => {};
            const deleteFunc = deleteTeamMemberFromTeam(setTeamMembers);
            await deleteFunc(props.data.id, props.data.teamMemberFirstName, props.data.teamMemberLastName, props.data.position);
            // Refresh the grid after deletion
            props.api.refreshCells({ force: true });
        } catch (error) {
            console.error(`Error deleting team member: ${error.message}`, error);
        }
    };

    return <button onClick={onButtonClick}>Delete</button>;
};