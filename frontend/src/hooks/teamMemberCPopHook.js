import { useState } from 'react';

export default function useTMConfPopup() {
    const [open, setOpen] = useState(false);
    const [newTeamMember, setNewTeamMember] = useState(null);

    const addTeamMember = (teamMember) => {
        // Add the team member...
        setNewTeamMember(teamMember);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return { open, newTeamMember, addTeamMember, handleClose };
}