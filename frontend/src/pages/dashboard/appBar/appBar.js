import React from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, Button } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { buttonStyles } from '../../../styles/appBarStyling';
import { darkTheme } from '../../../styles/darkTheme';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { StyledAppBar } from '../../../styles/drawerStyling';

function ButtonField(props) {
	const {
		setOpen,
		label,
		id,
		disabled,
		InputProps: { ref } = {},
		inputProps: { 'aria-label': ariaLabel } = {},
	} = props;

	return (
		<Button
			variant="outlined"
			id={id}
			disabled={disabled}
			ref={ref}
			aria-label={ariaLabel}
			onClick={() => setOpen?.((prev) => !prev)}
			sx={buttonStyles}
		>
			{label ? `Date: ${label}` : 'Pick a date'}
		</Button>
	);
}

function ButtonDatePicker(props) {
	const [open, setOpen] = React.useState(false);

	return (
		<DatePicker
			slots={{ field: ButtonField, ...props.slots }}
			slotProps={{ field: { setOpen } }}
			{...props}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
		/>
	);
}

function SearchAppBar() {
	const [selectedDate, setSelectedDate] = React.useState(moment());

	const handleDateChange = (date) => {
		setSelectedDate(moment(date));
		// Here you can dispatch an action or call a function to update the infographics in the dashboard
	};

	return (
		<StyledAppBar>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ThemeProvider theme={darkTheme}>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<ButtonDatePicker
								label={selectedDate.format('MM/DD/YYYY')}
								value={selectedDate}
								onChange={handleDateChange}
							/>
						</LocalizationProvider>
					</ThemeProvider>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton color="inherit" component={Link} to="/notifications">
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" component={Link} to="/profile">
						<Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
					</IconButton>
					<Divider orientation="vertical" flexItem />
					<IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</StyledAppBar>
	);
}

export default SearchAppBar;
