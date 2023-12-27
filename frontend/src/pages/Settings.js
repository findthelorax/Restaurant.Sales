import React, { useState } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	Grid,
	Card,
	CardContent,
	Typography,
	Skeleton,
	Box,
	MenuItem,
} from '@mui/material';
import { updateTipOutPercentages } from '../hooks/tipOuts';

const timezones = [
	'America/New_York',
	'America/Detroit',
	'America/Kentucky/Louisville',
	'America/Kentucky/Monticello',
	'America/Indiana/Indianapolis',
	'America/Indiana/Vincennes',
	'America/Indiana/Winamac',
	'America/Indiana/Marengo',
	'America/Indiana/Petersburg',
	'America/Indiana/Vevay',
	'America/Chicago',
	'America/Indiana/Tell_City',
	'America/Indiana/Knox',
	'America/Menominee',
	'America/North_Dakota/Center',
	'America/North_Dakota/New_Salem',
	'America/North_Dakota/Beulah',
	'America/Denver',
	'America/Boise',
	'America/Phoenix',
	'America/Los_Angeles',
	'America/Anchorage',
	'America/Juneau',
	'America/Sitka',
	'America/Metlakatla',
	'America/Yakutat',
	'America/Nome',
	'America/Adak',
	'America/Honolulu',
	'America/Toronto',
	'America/Thunder_Bay',
	'America/Nipigon',
	'America/Rainy_River',
	'America/Atikokan',
	'America/Winnipeg',
	'America/Regina',
	'America/Swift_Current',
	'America/Edmonton',
	'America/Vancouver',
	'America/Dawson_Creek',
	'America/Fort_Nelson',
	'America/Whitehorse',
	'America/Dawson',
	'Europe/London',
	'Europe/Paris',
	'Europe/Berlin',
	'Asia/Tokyo',
	'Asia/Shanghai',
	'Asia/Dubai',
	'Australia/Sydney',
];

const currencies = [
	'USD', // United States Dollar
	'EUR', // Euro
	'JPY', // Japanese Yen
	'GBP', // British Pound Sterling
	'AUD', // Australian Dollar
	'CAD', // Canadian Dollar
];

function SettingsPage({ currentUser }) {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [currency, setCurrency] = useState('USD');
	const [bartenderTipOut, setBartenderTipOut] = useState(0.05);
	const [runnerTipOut, setRunnerTipOut] = useState(0.04);
	const [hostTipOut, setHostTipOut] = useState(0.015);

	const handleTimezoneChange = (event) => {
		setTimezone(event.target.value);
		// Save the timezone to context or local storage here
	};

	const handleCurrencyChange = (event) => {
		setCurrency(event.target.value);
		// Save the currency to context or local storage here
	};

	const handleTipOutChange = (event) => {
		const { name, value } = event.target;
		if (name === 'bartender') setBartenderTipOut(value);
		else if (name === 'runner') setRunnerTipOut(value);
		else if (name === 'host') setHostTipOut(value);

		updateTipOutPercentages({
			bartender: bartenderTipOut,
			runner: runnerTipOut,
			host: hostTipOut,
		});
	};

	return (
		<Box
			sx={{
				backgroundColor: 'lightblue',
				border: '1px solid black',
				boxShadow: '5px 5px 0px 0px black',
				borderRadius: '15px',
			}}
		>
			<Grid container>
				<Grid item xs={6}>
					<Card
						sx={{
							m: 2,
							backgroundColor: 'lightblue',
							border: '1px solid black',
							boxShadow: '5px 5px 0px 0px black',
							borderRadius: '15px',
						}}
					>
						<CardContent>
							<Typography variant="h5">Stats Card 1</Typography>
							<Skeleton variant="rectangular" width={210} height={118} />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card
						sx={{
							m: 2,
							backgroundColor: 'lightblue',
							border: '1px solid black',
							boxShadow: '5px 5px 0px 0px black',
							borderRadius: '15px',
						}}
					>
						<CardContent>
							<Typography variant="h5">Stats Card 2</Typography>
							<Skeleton variant="rectangular" width={210} height={118} />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<FormControl>
				<InputLabel id="timezone-select-label">Timezone</InputLabel>
				<Select
					labelId="timezone-select-label"
					id="timezone-select"
					value={timezone}
					onChange={handleTimezoneChange}
				>
					{timezones.map((tz) => (
						<MenuItem key={tz} value={tz}>
							{tz}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id="currency-select-label">Currency</InputLabel>
				<Select
					labelId="currency-select-label"
					id="currency-select"
					value={currency}
					onChange={handleCurrencyChange}
				>
					{currencies.map((currency) => (
						<MenuItem key={currency} value={currency}>
							{currency}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{currentUser && (currentUser.role === 'manager' || currentUser.role === 'root') ? (
				<>
					<FormControl>
						<TextField
							label="Bartender Tip Out Percentage"
							name="bartender"
							value={bartenderTipOut}
							onChange={handleTipOutChange}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Runner Tip Out Percentage"
							name="runner"
							value={runnerTipOut}
							onChange={handleTipOutChange}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Host Tip Out Percentage"
							name="host"
							value={hostTipOut}
							onChange={handleTipOutChange}
						/>
					</FormControl>
				</>
			) : null}
		</Box>
	);
}

export default SettingsPage;
