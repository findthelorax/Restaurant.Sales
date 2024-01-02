import React, { useContext, useMemo } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { useDeleteTeamMemberFromTeam } from '../../handlers/teamMembersConfirmations';
import TeamMembersListRender from './teamMembersListRender';
import { POSITIONS } from '../../utils/constraints';

function TeamMembersList() {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
	const deleteTeamMember = useDeleteTeamMemberFromTeam(setTeamMembers);

	const teamMemberByPosition = useMemo(() => {
		const teamMemberByPosition = POSITIONS.reduce((acc, position) => {
			acc[position] = [];
			return acc;
		}, {});

		teamMemberByPosition['other'] = [];

		teamMembers.forEach((member) => {
			if (member.position && teamMemberByPosition.hasOwnProperty(member.position)) {
				teamMemberByPosition[member.position].push(member);
			} else {
				teamMemberByPosition['other'].push(member);
			}
		});

        return Object.fromEntries(
            Object.entries(teamMemberByPosition).map(([position, members]) => [
                position,
                [...members].sort((a, b) => {
                    // Check if teamMemberFirstName and teamMemberLastName exist before comparing
                    if (a.teamMemberFirstName && b.teamMemberFirstName && a.teamMemberLastName && b.teamMemberLastName) {
                        // Compare by first name, then by last name
                        const firstNameComparison = a.teamMemberFirstName.localeCompare(b.teamMemberFirstName);
                        if (firstNameComparison !== 0) {
                            return firstNameComparison;
                        } else {
                            return a.teamMemberLastName.localeCompare(b.teamMemberLastName);
                        }
                    } else {
                        // If teamMemberFirstName or teamMemberLastName doesn't exist, don't compare
                        return 0;
                    }
                }),
            ])
        );
    }, [teamMembers]);

	return <TeamMembersListRender teamMemberByPosition={teamMemberByPosition} deleteTeamMember={deleteTeamMember} />;
}

export default TeamMembersList;