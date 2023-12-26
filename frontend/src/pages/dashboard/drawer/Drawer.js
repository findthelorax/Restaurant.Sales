import React from 'react';
import { MainListItems, SecondaryListItems, SettingsListItems } from './NavItemsList';
import { Box, Drawer, Divider, ListItem, Avatar } from '@mui/material';
import restaurantPNG from '../../../assets/restaurant.png';

export const drawerWidth = 240;

export function PermanentDrawerLeft({ setSelectedMenu }) {
	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
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
				<Divider />
				<Box>
					<MainListItems setSelectedMenu={setSelectedMenu} />
				</Box>
				<Divider />
				<Box>
					<SecondaryListItems setSelectedMenu={setSelectedMenu} />
				</Box>
				<Divider />
				<Box>
					<SettingsListItems setSelectedMenu={setSelectedMenu} />
				</Box>
			</Drawer>
		</Box>
	);
}
