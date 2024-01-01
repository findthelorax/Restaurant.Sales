import React, { useState, useContext } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { useAddTeamMemberToTeam } from '../../handlers/teamMembersConfirmations';
import TeamMemberFormRender from './teamMembersFormRender';

function TeamMemberForm() {
    const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
    const [teamMemberFirstName, setTeamMemberFirstName] = useState('');
    const [teamMemberLastName, setTeamMemberLastName] = useState('');
    const [position, setPosition] = useState();
    const [teamId, setTeamId] = useState([]);

    const addTeamMember = useAddTeamMemberToTeam(teamMemberFirstName, teamMemberLastName, position, teamId, teamMembers, setTeamMembers);
    return (
        <TeamMemberFormRender
            teamMemberFirstName={teamMemberFirstName}
            setTeamMemberFirstName={setTeamMemberFirstName}
            teamMemberLastName={teamMemberLastName}
            setTeamMemberLastName={setTeamMemberLastName}
            position={position}
            setPosition={setPosition}
            teamId={teamId}
            setTeamId={setTeamId}
            addTeamMember={addTeamMember}
        />
    );
}

export default React.memo(TeamMemberForm);