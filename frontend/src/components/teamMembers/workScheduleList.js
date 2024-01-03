import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { TeamContext } from '../../contexts/TeamContext';
import moment from 'moment';

export const ViewSchedule = () => {
    const { teamMembers } = useContext(TeamMembersContext);
    const { getTeamNameFromId } = useContext(TeamContext);

    const [sortedTeams, setSortedTeams] = useState([]);

    const totalWorkScheduleDates = teamMembers.reduce((total, member) => total + member.workSchedule.length, 0);

    useEffect(() => {
        // Group team members by team, date, and position
        const teams = teamMembers.reduce((teams, member) => {
            const teamName = getTeamNameFromId(member.teams[0]).toLowerCase();
            if (!teams[teamName]) {
                teams[teamName] = {};
            }
            member.workSchedule.forEach((date) => {
                const formattedDate = moment(date).format('LL');
                if (!teams[teamName][formattedDate]) {
                    teams[teamName][formattedDate] = {};
                }
                const position = member.position.toLowerCase();
                if (!teams[teamName][formattedDate][position]) {
                    teams[teamName][formattedDate][position] = [];
                }
                teams[teamName][formattedDate][position].push(member);
            });
            return teams;
        }, {});

        // Sort teams, dates, positions, and team members within each position
        const newSortedTeams = Object.entries(teams)
            .sort(([teamA], [teamB]) => {
                if (teamA < teamB) return -1;
                if (teamA > teamB) return 1;
                return 0;
            })
            .map(([team, dates]) => ({
                team: team
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                dates: Object.entries(dates)
                    .sort(([dateA], [dateB]) => {
                        if (dateA < dateB) return -1;
                        if (dateA > dateB) return 1;
                        return 0;
                    })
                    .map(([date, positions]) => ({
                        date,
                        positions: Object.entries(positions)
                            .sort(([positionA], [positionB]) => {
                                if (positionA < positionB) return -1;
                                if (positionA > positionB) return 1;
                                return 0;
                            })
                            .map(([position, members]) => ({
                                position,
                                members: [...members].sort((a, b) => {
                                    const nameA = `${a.teamMemberFirstName} ${a.teamMemberLastName}`;
                                    const nameB = `${b.teamMemberFirstName} ${b.teamMemberLastName}`;
                                    if (nameA < nameB) return -1;
                                    if (nameA > nameB) return 1;
                                    return 0;
                                }),
                            })),
                    })),
            }));

        setSortedTeams(newSortedTeams);
    }, [teamMembers, getTeamNameFromId, teamMembers.length, totalWorkScheduleDates]);

    return (
        <div>
            <h2>Work Schedule</h2>
            {sortedTeams.map(({ team, dates }) => (
                <Card key={team}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {team}
                        </Typography>
                        {dates.map(({ date, positions }) => (
                            <div key={date}>
                                <Typography color="textSecondary">{date}</Typography>
                                {positions.map(({ position, members }) => (
                                    <div key={position}>
                                        <Typography variant="body2" component="p">
                                            {position.charAt(0).toUpperCase() + position.slice(1)}{members.length > 1 ? 's' : ''}:
                                        </Typography>
                                        {members.map((member) => (
                                            <Typography variant="body2" component="p" key={member._id}>
                                                {`${member.teamMemberFirstName} ${member.teamMemberLastName}`}
                                            </Typography>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};