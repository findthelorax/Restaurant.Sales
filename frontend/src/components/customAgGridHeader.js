import React, { useState } from 'react';
import { useDeleteTeamMemberFromTeam } from '../handlers/teamMembersConfirmations';

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

function ErrorModal({ message, onClose }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div style={{ width: '300px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '5px' }}>
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export const DeleteTMButtonRender = (props) => {
    const [error, setError] = useState(null);
    const setTeamMembers = () => {};
    const deleteFunc = useDeleteTeamMemberFromTeam(setTeamMembers);

    const onButtonClick = async () => {
        // Delete team member
        try {
            await deleteFunc(props.data.id, props.data.teamMemberFirstName, props.data.teamMemberLastName, props.data.position);
            // Refresh the grid after deletion
            props.api.applyTransaction({ remove: [props.data] });
        } catch (error) {
            setError(`Error deleting team member: ${error.message}`);
        }
    };

    const closeModal = () => {
        setError(null);
    };

    return (
        <div>
            <button onClick={onButtonClick}>Delete</button>
            {error && <ErrorModal message={error} onClose={closeModal} />}
        </div>
    );
};