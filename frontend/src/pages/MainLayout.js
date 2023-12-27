import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import SearchAppBar from './dashboard/appBar/appBar';
import { PermanentDrawerLeft } from './dashboard/drawer/Drawer';
import Dashboard from './Dashboard';
// import TeamMembersPage from '../teamMembers/TeamMembersPage';
// import SettingsPage from '../Settings';
// import DatabasePage from '../database/databasePage';
import moment from 'moment';
import { Outlet } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

function MainLayout() {
	const [selectedDate, setSelectedDate] = useState(moment());
	// const { currentUser } = useAuth();

	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const [selectedMenu, setSelectedMenu] = useState('Dashboard');

	const renderSelectedComponent = () => {
		switch (selectedMenu) {
			case 'Dashboard':
				return <Dashboard />;
			// case 'Team Members':
			// 	return <TeamMembersPage />;
			// case 'Database':
			// 	return <DatabasePage />;
			// case 'Settings':
			// 	return <SettingsPage />;
			default:
				return null;
		}
	};

	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<PermanentDrawerLeft open={isDrawerOpen} handleDrawerClose={handleDrawerToggle} setSelectedMenu={setSelectedMenu} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
					flexGrow: 1,
				}}
			>
				<SearchAppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
				<Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
					{/* <Toolbar /> */}
					{renderSelectedComponent()}
				</Box>
			</Box>
		</Box>
	);
}

export default MainLayout;