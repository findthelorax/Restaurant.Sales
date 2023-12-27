import React, { useState } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { POSITIONS } from '../../utils/constraints';
import { StyledCard, StyledBox, StyledTextField, StyledFormControl, StyledButton } from '../../styles/teamMemberFormStyles';

function TeamMemberForm({ teamMemberFirstName, setTeamMemberFirstName, teamMemberLastName, setTeamMemberLastName, position = '', setPosition, addTeamMember }) {
	const [setOpen] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		addTeamMember();
	};

	return (
		<StyledCard>
			<StyledBox component="form" onSubmit={handleSubmit}>
				<StyledTextField
					id="teamMemberFirstName"
					label="First Name"
					placeholder="Enter first name"
					value={teamMemberFirstName}
					onChange={(e) => setTeamMemberFirstName(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					id="teamMemberLastName"
					label="Last Name"
					placeholder="Enter last name"
					value={teamMemberLastName}
					onChange={(e) => setTeamMemberLastName(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<StyledFormControl fullWidth margin="normal">
				<InputLabel id="position">Position</InputLabel>
					<Select
						labelId="position"
						id="position"
						value={position}
						label="Position"
						onChange={(e) => setPosition(e.target.value)}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
					>
						<MenuItem value='' disabled>
							Select a position
						</MenuItem>
						{POSITIONS.map((position) => (
							<MenuItem key={position} value={position}>
								{position}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>
				<StyledButton variant="contained" color="primary" type="submit">
					Add Team Member
				</StyledButton>
			</StyledBox>
		</StyledCard>
	);
}

export default TeamMemberForm;