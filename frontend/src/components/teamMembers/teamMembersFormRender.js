import React, { useState, useContext } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Snackbar, Alert } from '@mui/material';
import { POSITIONS } from '../../utils/constraints';
import {
	StyledTMCard,
	StyledBox,
	StyledTextField,
	StyledFormControl,
	PinkStyledButton,
} from '../../styles/mainLayoutStyles';
import { TeamContext } from '../../contexts/TeamContext';

function TeamMemberForm({
	teamMemberFirstName,
	setTeamMemberFirstName,
	teamMemberLastName,
	setTeamMemberLastName,
	position = '',
	setPosition,
	teamId,
	setTeamId,
	addTeamMember,
}) {
	// eslint-disable-next-line
	const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const { teams, setTeams } = useContext(TeamContext);
	const [submitStatus, setSubmitStatus] = useState(null);
	const [successMessage, setSuccessMessage] = useState('');

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create a new team member object
		const newTeamMember = {
			firstName: teamMemberFirstName,
			lastName: teamMemberLastName,
			position: position,
			teams: [teamId],
		};

		try {
			// Call addTeamMember with the new team member object
			await addTeamMember(newTeamMember);
			setSuccessMessage(
				`${capitalizeFirstLetter(teamMemberFirstName)} ${capitalizeFirstLetter(
					teamMemberLastName
				)} - ${position} added to ${teams.find((team) => team._id === teamId)?.teamName}!`
			);
			setSubmitStatus('success');
		} catch (error) {
			setSubmitStatus('error');
		}
		// Clear the form fields
		setTeamMemberFirstName('');
		setTeamMemberLastName('');
		setPosition('');
		setTeamId('');
	};

	return (
		<StyledTMCard>
			<StyledBox component="form" onSubmit={handleSubmit}>
				<StyledTextField
					id="teamMemberFirstName"
					label="First Name"
					placeholder="Enter first name"
					value={teamMemberFirstName}
					onChange={(e) => setTeamMemberFirstName(e.target.value)}
					fullWidth
					margin="normal"
					// size="small"
				/>
				<StyledTextField
					id="teamMemberLastName"
					label="Last Name"
					placeholder="Enter last name"
					value={teamMemberLastName}
					onChange={(e) => setTeamMemberLastName(e.target.value)}
					fullWidth
					margin="normal"
					// size="small"
				/>
				<StyledFormControl fullWidth margin="normal">
					<Grid container spacing={1} mt={0.5} mb={1}>
						{POSITIONS.map((pos, index) => (
							<Grid item xs={6} key={pos}>
								<Button
									fullWidth
									onClick={() => setPosition(pos)}
									variant={position === pos ? 'contained' : 'outlined'}
								>
									{pos}
								</Button>
							</Grid>
						))}
					</Grid>
				</StyledFormControl>
				<StyledFormControl fullWidth margin="normal">
					<InputLabel id="teams">Team</InputLabel>
					<Select
						labelId="teams"
						id="teams"
						value={teamId}
						label="Team"
						// size="small"
						onChange={(e) => setTeamId(e.target.value)}
					>
						<MenuItem value="" disabled>
							Select a team
						</MenuItem>
						{Array.isArray(teams) &&
							teams.map((team) => (
								<MenuItem key={team._id} value={team._id}>
									{team.teamName}
								</MenuItem>
							))}
					</Select>
				</StyledFormControl>
				<PinkStyledButton variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
					Add Team Member
				</PinkStyledButton>
				<Snackbar open={submitStatus !== null} autoHideDuration={6000} onClose={() => setSubmitStatus(null)}>
					<Alert
						onClose={() => setSubmitStatus(null)}
						severity={submitStatus || 'info'}
						sx={{ width: '100%' }}
					>
						{submitStatus === 'success' ? successMessage : 'Failed!'}
					</Alert>
				</Snackbar>
			</StyledBox>
		</StyledTMCard>
	);
}

export default TeamMemberForm;
