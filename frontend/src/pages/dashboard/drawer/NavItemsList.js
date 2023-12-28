import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiTeamLine } from 'react-icons/ri';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCalendar2Month } from 'react-icons/bs';
import { GiCalendarHalfYear } from 'react-icons/gi';
import { TbDatabaseCog } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { StyledListSubheader, StyledListItemIcon } from '../../../styles/mainLayoutStyles';

export const MainListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Dashboard')}>
			<StyledListItemIcon>
				<AiOutlineDashboard />
			</StyledListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Team Members')}>
			<StyledListItemIcon>
				<RiTeamLine />
			</StyledListItemIcon>
			<ListItemText primary="Team Members" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Totals')}>
			<StyledListItemIcon>
				<GiMoneyStack />
			</StyledListItemIcon>
			<ListItemText primary="Totals" />
		</ListItemButton>
	</React.Fragment>
);

export const SecondaryListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Reports</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Monthly Sales')}>
			<StyledListItemIcon>
				<BsCalendar2Month />
			</StyledListItemIcon>
			<ListItemText primary="Monthly Sales" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Yearly Sales')}>
			<StyledListItemIcon>
				<GiCalendarHalfYear />
			</StyledListItemIcon>
			<ListItemText primary="Yearly Sales" />
		</ListItemButton>
	</React.Fragment>
);

export const SettingsListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Settings</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Database')}>
			<StyledListItemIcon>
				<TbDatabaseCog />
			</StyledListItemIcon>
			<ListItemText primary="Database" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Settings')}>
			<StyledListItemIcon>
				<FiSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);