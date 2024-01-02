import React, { useState, useContext } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { StyledBox, StyledFormControl, PinkStyledButton } from '../../styles/mainLayoutStyles';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { addWorkDate } from '../../api/teamMembers';

export const AddToScheduleForm = ({ onAddToSchedule }) => {
    const { teamMembers } = useContext(TeamMembersContext);
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [selectedDate, setSelectedDate] = useState(''); // Initialize as empty string

    const handleSelectTeamMember = (event) => {
        const selectedTeamMemberId = event.target.value;
        const selectedTeamMember = teamMembers.find((member) => member._id === selectedTeamMemberId);
        setSelectedTeamMember(selectedTeamMember);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedTeamMember && selectedDate) {
            try {
                await addWorkDate(selectedTeamMember._id, selectedDate);
                onAddToSchedule(selectedTeamMember, selectedDate);
            } catch (error) {
                console.error(`Error adding work date: ${error.message}`, error);
            }
        }
    };

    return (
        <StyledBox component="form" onSubmit={handleSubmit}>
            <StyledFormControl fullWidth margin="normal">
                <InputLabel id="selectedTeamMember">Team Member</InputLabel>
                <Select
                    labelId="selectedTeamMember"
                    id="selectedTeamMember"
                    value={selectedTeamMember ? selectedTeamMember._id : ''}
                    label="Team Member"
                    onChange={handleSelectTeamMember}
                >
                    <MenuItem value="" disabled>
                        Select Team Member
                    </MenuItem>
                    {teamMembers.map((member) => (
                        <MenuItem key={member._id} value={member._id}>
                            {`${member.teamMemberFirstName} ${member.teamMemberLastName} - ${member.position}`}
                        </MenuItem>
                    ))}
                </Select>
            </StyledFormControl>

            <StyledFormControl fullWidth margin="normal">
                <InputLabel id="selectedDate">Date</InputLabel>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </StyledFormControl>

            <PinkStyledButton variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Add to Schedule
            </PinkStyledButton>
        </StyledBox>
    );
};