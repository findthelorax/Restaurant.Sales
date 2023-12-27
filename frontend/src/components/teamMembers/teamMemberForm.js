import React, { useState, useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { addTeamMemberToTeam } from '../../handlers/teamMembersConfirmations';
import TeamMemberFormRender from './teamMembersFormRender';

function TeamMemberForm() {
    const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
    const [teamMemberFirstName, setTeamMemberFirstName] = useState('');
    const [teamMemberLastName, setTeamMemberLastName] = useState('');
    const [position, setPosition] = useState();

    const clearInputs = () => {
        setTeamMemberFirstName('');
        setTeamMemberLastName('');
        setPosition('');
    };
    
    const addTeamMember = addTeamMemberToTeam(teamMemberFirstName, teamMemberLastName, position, teamMembers, setTeamMembers, clearInputs);

    return (
        <TeamMemberFormRender
            teamMemberFirstName={teamMemberFirstName}
            setTeamMemberFirstName={setTeamMemberFirstName}
            teamMemberLastName={teamMemberLastName}
            setTeamMemberLastName={setTeamMemberLastName}
            position={position}
            setPosition={setPosition}
            addTeamMember={addTeamMember}
        />
    );
}

export default React.memo(TeamMemberForm);