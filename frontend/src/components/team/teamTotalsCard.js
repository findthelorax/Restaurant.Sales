import React, { useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { StyledTeamCard } from '../../styles/mainLayoutStyles';

export function TeamTotalsCards() {
    const { teams } = useContext(TeamContext);
    const { teamMembers } = useContext(TeamMembersContext);

    return (
        <div>
            {teams.map((team) => {
                const teamMembersForTeam = teamMembers.filter(member => member.teamId === team._id);
                const teamMembersCount = teamMembersForTeam.length;
                const totalSales = teamMembersForTeam.reduce((total, member) => total + member.dailyTotals + member.weeklyTotals, 0);

                return (
                    <StyledTeamCard key={team._id}>
                        <h2>{team.teamName}</h2>
                        <p>Team Members: {teamMembersCount}</p>
                        <p>Total Sales: {totalSales}</p>
                    </StyledTeamCard>
                );
            })}
        </div>
    );
};