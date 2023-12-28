import React, { useState, useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext';
import { ErrorContext } from '../../contexts/ErrorContext';
import { StyledTeamCard, StyledBox, StyledTextField, StyledTeamButton } from '../../styles/mainLayoutStyles';

function TeamForm() {
    const [teamName, setTeamName] = useState('');
    const { showError, error } = useContext(ErrorContext);
    const { teams, addTeam } = useContext(TeamContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if the team name already exists
        if (teams.some(team => team.name.toLowerCase() === teamName.toLowerCase())) {
            showError('This team name already exists.');
            return;
        }

        addTeam(teamName);
        setTeamName('');
        showError(null);
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
                />
                <StyledTeamButton type="submit">
                    Add Team
                </StyledTeamButton>
            </StyledBox>
        </StyledTeamCard>
    );
}

export default TeamForm;