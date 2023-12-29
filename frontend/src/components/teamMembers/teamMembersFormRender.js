import React, { useState, useContext } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { POSITIONS } from '../../utils/constraints';
import {
	StyledTMCard,
	StyledBox,
	StyledTextField,
	StyledFormControl,
	PinkStyledButton,
} from '../../styles/mainLayoutStyles';
import { TeamContext } from '../../contexts/TeamContext'; // Update the import path as needed

function TeamMemberForm({
	teamMemberFirstName,
	setTeamMemberFirstName,
	teamMemberLastName,
	setTeamMemberLastName,
	position = '',
	setPosition,
	addTeamMember,
}) {
	// eslint-disable-next-line
	const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const { teams, setTeams } = useContext(TeamContext);
	const [selectedTeam, setSelectedTeam] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		// Create a new team member object
		const newTeamMember = {
			firstName: teamMemberFirstName,
			lastName: teamMemberLastName,
			position: position,
			teamId: selectedTeam, // Set the team id to selectedTeam
		};

		// Call addTeamMember with the new team member object
		addTeamMember(newTeamMember);

		// Clear the form fields
		setTeamMemberFirstName('');
		setTeamMemberLastName('');
		setPosition('');
		setSelectedTeam('');
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
					<InputLabel id="position">Position</InputLabel>
					<Select
						labelId="position"
						id="position"
						value={position}
						label="Position"
						// size="small"
						onChange={(e) => setPosition(e.target.value)}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
					>
						<MenuItem value="" disabled>
							Select a position
						</MenuItem>
						{POSITIONS.map((position) => (
							<MenuItem key={position} value={position}>
								{position}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>
				<StyledFormControl fullWidth margin="normal">
					<InputLabel id="teams">Team</InputLabel>
					<Select
						labelId="teams"
						id="teams"
						value={selectedTeam}
						label="Team"
						// size="small"
						onChange={(e) => setSelectedTeam(e.target.value)}
					>
						<MenuItem value="" disabled>
							Select a team
						</MenuItem>
						{Array.isArray(teams) &&
							teams.map((team) => (
								<MenuItem key={team._id} value={team._id}>
									{team.name}
								</MenuItem>
							))}
					</Select>
				</StyledFormControl>
				<PinkStyledButton variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
					Add Team Member
				</PinkStyledButton>
			</StyledBox>
		</StyledTMCard>
	);
}

export default TeamMemberForm;