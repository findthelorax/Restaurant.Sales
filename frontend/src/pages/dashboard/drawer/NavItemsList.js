import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { AiOutlineDashboard } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { BsCalendar2Month } from "react-icons/bs";
import { GiCalendarHalfYear } from "react-icons/gi";
import { TbDatabaseCog } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

export const MainListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<ListItemButton onClick={() => setSelectedMenu('Dashboard')}>
			<ListItemIcon>
				<AiOutlineDashboard />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Team Members')}>
			<ListItemIcon>
				<RiTeamLine />
			</ListItemIcon>
			<ListItemText primary="Team Members" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Totals')}>
			<ListItemIcon>
				<GiMoneyStack />
			</ListItemIcon>
			<ListItemText primary="Totals" />
		</ListItemButton>
	</React.Fragment>
);

export const SecondaryListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<ListSubheader component="div" sx={{paddingLeft: 0}}>Reports</ListSubheader>
		<ListItemButton >
			<ListItemIcon >
				<BsCalendar2Month />
			</ListItemIcon>
			<ListItemText primary="Current Month" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<GiCalendarHalfYear />
			</ListItemIcon>
			<ListItemText primary="Yearly Sales" />
		</ListItemButton>
	</React.Fragment>
);

export const SettingsListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<ListSubheader component="div" sx={{paddingLeft: 0}}>Settings</ListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Database')}>
			<ListItemIcon>
				<TbDatabaseCog />
			</ListItemIcon>
			<ListItemText primary="Database" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Settings')}>
			<ListItemIcon>
				<FiSettings />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);
