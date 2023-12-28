import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Badge } from '@mui/material';
import { styled } from '@mui/system';
import { TeamContext } from '../../contexts/TeamContext';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 300,
    margin: theme.spacing(2),
}));

export const TeamCard = ({ team, isFocused }) => {
    return (
        <StyledCard className={isFocused ? 'focused' : ''}>
            <CardContent>
                <Avatar src={team.avatar} alt={team.name} />
                <Typography variant="h5">{team.name}</Typography>
                <Typography variant="body2">{team.teamMembers && team.teamMembers.length} members</Typography>
                <Badge badgeContent={4} color="primary">
                    <Chip label="Team Chip" />
                </Badge>
            </CardContent>
        </StyledCard>
    );
};

export const TeamCards = () => {
    const { teams } = useContext(TeamContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % teams.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + teams.length) % teams.length);
    };

    return (
        <>
            {teams && teams.length > 0 && (
                <>
                    <button onClick={handlePrev}>Previous</button>
                    <TeamCard team={teams[currentIndex]} isFocused={false} />
                    <button onClick={handleNext}>Next</button>
                </>
            )}
        </>
    );
};