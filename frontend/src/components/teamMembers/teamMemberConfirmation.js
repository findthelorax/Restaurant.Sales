import React from 'react';
import { Snackbar, Slide, Chip, Badge } from '@mui/material';

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

function TeamMemberConfirmationPopup({ open, handleClose, teamMember }) {
    teamMember = teamMember || { firstName: 'Larry', lastName: 'Lair', position: 'Host' };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={SlideTransition}>
            <div>
                <Badge color="secondary" variant="dot">
                    <Chip label={`${teamMember.firstName} ${teamMember.lastName}`} />
                </Badge>
                <Chip label={teamMember.position} color="primary" style={{ marginLeft: '10px' }} />
            </div>
        </Snackbar>
    );
}
export default TeamMemberConfirmationPopup;
