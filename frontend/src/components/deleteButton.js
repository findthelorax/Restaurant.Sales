import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { deleteDailyTotalFromServer } from './../api/salesTotals';

export function DeleteDTButton(props) {
	const { deleteDailyTotal } = props.colDef.cellRendererParams;
	const { _id: id } = props.data;

	return (
		<Button variant="contained" sx={{ bgcolor: 'error.main', color: 'white' }} onClick={() => deleteDailyTotal(id)}>
			Delete
		</Button>
	);
}

export function DeleteTMButton(props) {
	const { deleteTeamMember } = props.colDef.cellRendererParams;
	const { _id: id } = props.data;

	return (
		<Button variant="contained" sx={{ bgcolor: 'error.main', color: 'white' }} onClick={() => deleteTeamMember(id)}>
			Delete
		</Button>
	);
}

export function DeleteDailyTotalsButton({ params, refreshData }) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async () => {
		try {
			await deleteDailyTotalFromServer(params.data.teamMemberId, params.data._id);
			handleClose();
			refreshData();
		} catch (error) {
			console.error(`Error deleting daily total: ${error.message}`);
		}
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Delete
			</Button>

			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					Are you sure you want to delete the daily total for {params.data.teamMemberFirstName} {params.data.teamMemberLastName} - {params.data.teamMemberPosition} on {' '}
					{params.data.date}?
				</DialogContent>
				<DialogActions>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Confirm Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
