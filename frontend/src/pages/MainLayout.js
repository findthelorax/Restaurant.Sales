import React, { useState } from 'react';
import moment from 'moment';
import { Box } from '@mui/material';
import SearchAppBar from './dashboard/appBar/appBar';
import { PermanentDrawerLeft } from './dashboard/drawer/Drawer';
import Dashboard from './Dashboard';
import SettingsPage from './Settings';
import DatabasePage from '../pages/database/databasePage';
import TeamMembersPage from '../pages/teamMembers/teamMembersPage';
import SchedulePage from './schedule/schedulePage';
// import { Outlet } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

function MainLayout() {
	// const { currentUser } = useAuth();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const [selectedMenu, setSelectedMenu] = useState('Dashboard');
	const [selectedDate, setSelectedDate] = useState(moment());
	
	const handleDateChange = (date) => {
		setSelectedDate(moment(date));
		// Here you can dispatch an action or call a function to update the infographics in the dashboard
	};

	const renderSelectedComponent = () => {
		switch (selectedMenu) {
			case 'Dashboard':
				return <Dashboard selectedDate={selectedDate} handleDateChange={handleDateChange}/>;
			case 'Team Members':
				return <TeamMembersPage />;
			case 'Database':
				return <DatabasePage />;
			case 'Settings':
				return <SettingsPage />;
			case 'Schedule':
				return <SchedulePage />;
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
				<SearchAppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} selectedDate={selectedDate} handleDateChange={handleDateChange} />
				<Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
					{/* <Toolbar /> */}
					{renderSelectedComponent()}
				</Box>
			</Box>
		</Box>
	);
}

export default MainLayout;