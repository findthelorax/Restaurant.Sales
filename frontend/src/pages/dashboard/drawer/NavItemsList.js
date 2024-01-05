import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiTeamLine } from 'react-icons/ri';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCalendar2Month } from 'react-icons/bs';
import { FcCalendar } from "react-icons/fc";
import { TbDatabaseCog } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { BsCalendar2Date } from "react-icons/bs";
import { StyledListSubheader, StyledListItemIcon } from '../../../styles/mainLayoutStyles';
import { Link } from 'react-router-dom';

export const MainListItems = () => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton component={Link} to="/dashboard">
			<StyledListItemIcon>
				<AiOutlineDashboard />
			</StyledListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton component={Link} to="/team-members">
			<StyledListItemIcon>
				<RiTeamLine />
			</StyledListItemIcon>
			<ListItemText primary="Team Members" />
		</ListItemButton>
		<ListItemButton component={Link} to="/schedule">
			<StyledListItemIcon>
				<BsCalendar2Date />
			</StyledListItemIcon>
			<ListItemText primary="Schedule" />
		</ListItemButton>
		<ListItemButton component={Link} to="/totals">
			<StyledListItemIcon>
				<GiMoneyStack />
			</StyledListItemIcon>
			<ListItemText primary="Totals" />
		</ListItemButton>
	</React.Fragment>
);

export const SecondaryListItems = () => (
	<React.Fragment>
		<StyledListSubheader component="div">Reports</StyledListSubheader>
		<ListItemButton component={Link} to="/monthly-sales">
			<StyledListItemIcon>
				<BsCalendar2Month />
			</StyledListItemIcon>
			<ListItemText primary="Monthly Sales" />
		</ListItemButton>
		<ListItemButton component={Link} to="/yearly-sales">
			<StyledListItemIcon>
				<FcCalendar />
			</StyledListItemIcon>
			<ListItemText primary="Yearly Sales" />
		</ListItemButton>
	</React.Fragment>
);

export const SettingsListItems = () => (
	<React.Fragment>
		<StyledListSubheader component="div">Settings</StyledListSubheader>
		<ListItemButton component={Link} to="/database">
			<StyledListItemIcon>
				<TbDatabaseCog />
			</StyledListItemIcon>
			<ListItemText primary="Database" />
		</ListItemButton>
		<ListItemButton component={Link} to="/settings">
			<StyledListItemIcon>
				<FiSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);