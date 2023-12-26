import React, { useEffect, useContext, useMemo } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { getTeamMembers } from '../../utils/api';
import { deleteTeamMemberFromTeam } from '../../hooks/teamMembersLogic';
import TeamMembersRender from './teamMembersListRender';

const POSITIONS = ['bartender', 'host', 'server', 'runner'];

function TeamMembersList() {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
	const deleteMember = deleteTeamMemberFromTeam(setTeamMembers);

	const teamByPosition = useMemo(() => {
		const teamByPosition = POSITIONS.reduce((acc, position) => {
			acc[position] = [];
			return acc;
		}, {});

		teamByPosition['other'] = [];

		teamMembers.forEach((member) => {
			if (member.position && teamByPosition.hasOwnProperty(member.position)) {
				teamByPosition[member.position].push(member);
			} else {
				teamByPosition['other'].push(member);
			}
		});

		return Object.fromEntries(
			Object.entries(teamByPosition).map(([position, members]) => [
				position,
				[...members].sort((a, b) => {
					// Check if teamMemberName exists before comparing
					if (a.teamMemberName && b.teamMemberName) {
						return a.teamMemberName.localeCompare(b.teamMemberName);
					} else {
						// If teamMemberName doesn't exist, don't compare
						return 0;
					}
				}),
			])
		);
	}, [team]);

	return <TeamMembersRender teamByPosition={teamByPosition} deleteMember={deleteMember} />;
}

export default TeamMembersList;