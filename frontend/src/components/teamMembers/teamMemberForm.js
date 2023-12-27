import React, { useState, useContext, useCallback } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { addTeamMemberToTeam } from '../../hooks/teamMembersLogic';
import TeamMemberFormRender from './teamMembersFormRender';

function TeamMemberForm() {
    const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
    const [teamMemberName, setTeamMemberName] = useState('');
    const [position, setPosition] = useState('Bartender');

    const clearInputs = () => {
        setTeamMemberName('');
        setPosition('Server');
    };
    
    const addTeamMember = addTeamMemberToTeam(teamMemberName, position, teamMembers, setTeamMembers, clearInputs);

    return (
        <TeamMemberFormRender
            teamMemberName={teamMemberName}
            setTeamMemberName={setTeamMemberName}
            position={position}
            setPosition={setPosition}
            addTeamMember={addTeamMember}
        />
    );
}

export default React.memo(TeamMemberForm);