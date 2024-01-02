import React, { useState, useContext } from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { TeamContext } from '../../contexts/TeamContext';
import { StyledTeamCard, StyledBox, StyledTextField, PinkStyledButton } from '../../styles/mainLayoutStyles';

function TeamForm() {
	const [teamName, setTeamName] = useState('');
	const [error, setError] = useState(null);
	const { teams, addTeam: createTeam } = useContext(TeamContext);
	const [successOpen, setSuccessOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		// Check if the team name already exists
		if (teams.some((team) => team.teamName.toLowerCase() === teamName.toLowerCase())) {
			setError('This team name already exists.');
			return;
		}

		createTeam(teamName);
		setTeamName(''); // Clear the input field
		setError(null); // Clear any previous error

		// Set the success message and open the success Snackbar
		setSuccessMessage(`Team "${teamName}" has been created.`);
		setSuccessOpen(true);
	};

	return (
		<StyledTeamCard>
			<StyledBox component="form" onSubmit={handleSubmit}>
				<StyledTextField
					id="teamName"
					label="Team Name"
					placeholder="Enter team name"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
					fullWidth
					margin="normal"
					error={!!error}
					helperText={error}
					size="small"
				/>
				<PinkStyledButton type="submit">Add Team</PinkStyledButton>
			</StyledBox>
			<Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
				<Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
					{successMessage}
				</Alert>
			</Snackbar>
			<Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
				<Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>
		</StyledTeamCard>
	);
}

export default TeamForm;