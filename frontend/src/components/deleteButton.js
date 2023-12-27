import React from 'react';
import { Button } from '@mui/material';

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