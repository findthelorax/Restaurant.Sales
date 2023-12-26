import React, { useState, useContext, useCallback } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { addTeamMemberToTeam } from '../../hooks/teamMembersLogic';
import TeamMemberFormRender from './teamMembersFormRender';

function TeamMemberForm() {
    const { setTeamMembers } = useContext(TeamMembersContext);
    const [teamMemberName, setTeamMemberName] = useState('');
    const [position, setPosition] = useState('bartender');
    
    const clearInputs = () => {
        setTeamMemberName('');
        setPosition('server');
    };
    
    const addTeamMember = useCallback(() => addTeamMemberToTeam(teamMemberName, position, setTeamMembers, clearInputs), [teamMemberName, position]);

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