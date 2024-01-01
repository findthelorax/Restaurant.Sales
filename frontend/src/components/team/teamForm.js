import React, { useState, useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext';
import { StyledTeamCard, StyledBox, StyledTextField, PinkStyledButton } from '../../styles/mainLayoutStyles';

function TeamForm() {
	const [teamName, setTeamName] = useState('');
    const [error, setError] = useState(null);
    const { teams, addTeam: createTeam } = useContext(TeamContext);

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
		</StyledTeamCard>
	);
}

export default TeamForm;