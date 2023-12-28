import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { TeamCard } from './teamCard';
import { TeamContext } from '../../contexts/TeamContext';

const TeamCarousel = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [teams, setTeams] = useState(TeamContext);

    const handleSwipe = (direction) => {
        setFocusedIndex((prevIndex) => {
            if (direction === 'left' && prevIndex > 0) {
                return prevIndex - 1;
            } else if (direction === 'right' && prevIndex < teams.length - 1) {
                return prevIndex + 1;
            } else {
                return prevIndex;
            }
        });
    };

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden', justifyContent: 'center' }}>
            <Button onClick={() => handleSwipe('left')}>Swipe left</Button>
            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease-in-out' }}>
                {teams.map((team, index) => (
                    <TeamCard key={team.id} team={team} isFocused={index === focusedIndex} />
                ))}
            </Box>
            <Button onClick={() => handleSwipe('right')}>Swipe right</Button>
        </Box>
    );
};

export default TeamCarousel;