import React from 'react';
import { Button, Modal } from '@mui/material';
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

export function DeleteDailyTotalsButton({ params }) {
	console.log('🚀 ~ file: deleteButton.js:28 ~ DeleteDailyTotalsButton ~ params:', params);
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async () => {
		try {
			await deleteDailyTotalFromServer(params.data.teamMemberId, params.data.dailyTotalId);
			handleClose();
		} catch (error) {
			console.error(`Error deleting daily total: ${error.message}`);
		}
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Delete
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete the daily total for {params.data.name} ({params.data.position}) on{' '}
					{params.data.date}?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Confirm Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}