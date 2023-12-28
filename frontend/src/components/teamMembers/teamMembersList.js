import React, { useContext, useMemo } from 'react';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { useDeleteTeamMemberFromTeam } from '../../handlers/teamMembersConfirmations';
import TeamMembersListRender from './teamMembersListRender';
import { POSITIONS } from '../../utils/constraints';

function TeamMembersList() {
	const { teamMembers, setTeamMembers } = useContext(TeamMembersContext);
	const deleteTeamMember = useDeleteTeamMemberFromTeam(setTeamMembers);

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

	return <TeamMembersListRender teamByPosition={teamByPosition} deleteTeamMember={deleteTeamMember} />;
}

export default TeamMembersList;