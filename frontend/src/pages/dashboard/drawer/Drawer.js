import React from 'react';
import { MainListItems, SecondaryListItems, SettingsListItems } from './NavItemsList';
import { Box, ListItem, Avatar } from '@mui/material';
import restaurantPNG from '../../../assets/restaurant.png';
import { StyledDrawer, drawerWidth } from '../../../styles/drawerStyling';

export function PermanentDrawerLeft({ setSelectedMenu }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <StyledDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                }}
                variant="permanent"
                anchor="left"
            >
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        src={restaurantPNG}
                        alt="Restaurant"
                        variant="square"
                        sx={{ width: 48, height: 48 }}
                    />
                </ListItem>
                <Box>
                    <MainListItems setSelectedMenu={setSelectedMenu}/>
                </Box>
                <Box>
                    <SecondaryListItems setSelectedMenu={setSelectedMenu}/>
                </Box>
                <Box>
                    <SettingsListItems setSelectedMenu={setSelectedMenu}/>
                </Box>
            </StyledDrawer>
        </Box>
    );
}