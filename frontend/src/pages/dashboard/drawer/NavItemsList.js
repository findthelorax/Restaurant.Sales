import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiTeamLine } from 'react-icons/ri';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCalendar2Month } from 'react-icons/bs';
import { GiCalendarHalfYear } from 'react-icons/gi';
import { TbDatabaseCog } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { StyledListSubheader } from '../../../styles/drawerStyling';

export const MainListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Dashboard')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<AiOutlineDashboard />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Team Members')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<RiTeamLine />
			</ListItemIcon>
			<ListItemText primary="Team Members" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Totals')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<GiMoneyStack />
			</ListItemIcon>
			<ListItemText primary="Totals" />
		</ListItemButton>
	</React.Fragment>
);

export const SecondaryListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Reports</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Monthly Sales')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<BsCalendar2Month />
			</ListItemIcon>
			<ListItemText primary="Monthly Sales" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Yearly Sales')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<GiCalendarHalfYear />
			</ListItemIcon>
			<ListItemText primary="Yearly Sales" />
		</ListItemButton>
	</React.Fragment>
);

export const SettingsListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Settings</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Database')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<TbDatabaseCog />
			</ListItemIcon>
			<ListItemText primary="Database" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Settings')}>
			<ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
				<FiSettings />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);