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
import { Routes, Route } from 'react-router-dom';

function MainLayout() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const [selectedDate, setSelectedDate] = useState(moment());
	
	const handleDateChange = (date) => {
		setSelectedDate(moment(date));
	};

	const drawerWidth = 240;

	return (
			<Box sx={{ display: 'flex', width: '100%' }}>
				<PermanentDrawerLeft open={isDrawerOpen} handleDrawerClose={handleDrawerToggle} />
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
						<Routes>
							<Route path="/dashboard" element={<Dashboard selectedDate={selectedDate} handleDateChange={handleDateChange}/>} />
							<Route path="/team-members" element={<TeamMembersPage />} />
							<Route path="/database" element={<DatabasePage />} />
							<Route path="/settings" element={<SettingsPage />} />
							<Route path="/schedule" element={<SchedulePage />} />
							<Route path="*" element={<Dashboard selectedDate={selectedDate} handleDateChange={handleDateChange}/>} />
						</Routes>
					</Box>
				</Box>
			</Box>
	);
}

export default MainLayout;