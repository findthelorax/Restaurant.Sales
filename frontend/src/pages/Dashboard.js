import React, { useState } from 'react';
import { Grid, Typography, Stack, Button } from '@mui/material';
import TeamMembersList from '../components/teamMembers/teamMembersList';
import TeamMemberForm from '../components/teamMembers/teamMemberForm';
import TeamForm from '../components/team/teamForm';
import TeamMemberConfirmationPopup from '../components/teamMembers/teamMemberConfirmation';
import DailyTotalsForm from '../components/dailyTotals/dailyTotalsForm';
import { DailyTotalsTable } from '../components/dailyTotals/dailyTotalsTable';
import { DailyFoodSalesCard, DailyBarSalesCard } from '../components/dailyTotals/dailyTotalsCards';
import { WeeklyFoodSalesCard, WeeklyBarSalesCard } from '../components/weeklyTotals/weeklyTotalsCards';
import { WeeklyTotalsTable } from '../components/weeklyTotals/weeklyTotalsTable';
import { WeeklyTipsTable } from '../components/weeklyTotals/weeklyTipsTable';
import { TimePeriodTable } from '../components/salesTables/timePeriodTables';
import { TeamCards } from '../components/team/teamCard';
import useTMConfPopup from '../hooks/teamMemberCPopHook';
import Carousel from '../components/carousel';

// TODO: MONTHLY AND YEARLY TOTALS
function Dashboard({ selectedDate }) {
	// eslint-disable-next-line
	const [timePeriod, setTimePeriod] = useState('day');
	const { open, newTeamMember, handleClose } = useTMConfPopup();
	const weekStart = selectedDate.startOf('week').format('MM/DD/YY');
	const weekEnd = selectedDate.endOf('week').format('MM/DD/YY');

	const items = [
		{
			image: 'https://via.placeholder.com/150',
			title: 'Title 1',
			description: 'Description 1',
			chip: 'Chip 1',
			badge: 'Badge 1',
			onClick: () => console.log('Button 1 clicked'),
		},
		{
			image: 'https://via.placeholder.com/150',
			title: 'Title 1',
			description: 'Description 1',
			chip: 'Chip 1',
			badge: 'Badge 1',
			onClick: () => console.log('Button 1 clicked'),
		},
		{
			image: 'https://via.placeholder.com/150',
			title: 'Title 1',
			description: 'Description 1',
			chip: 'Chip 1',
			badge: 'Badge 1',
			onClick: () => console.log('Button 1 clicked'),
		},
	];

	return (
		<Grid container rowSpacing={3} columnSpacing={2.5}>
			{/* row 1 */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<WeeklyFoodSalesCard selectedDate={selectedDate} />
				{/* <WeeklyFoodSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} /> */}
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<WeeklyBarSalesCard selectedDate={selectedDate} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={3}>
				{/* {<DailyFoodSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />} */}
				{<DailyFoodSalesCard selectedDate={selectedDate} />}
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={3}>
				{/* <DailyBarSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} /> */}
				<DailyBarSalesCard selectedDate={selectedDate} />
			</Grid>

			{/* row 2 */}
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">Team Members</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4}>
				<TeamMemberForm />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4}>
				<TeamForm />
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<TeamMembersList />
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<TeamMemberConfirmationPopup open={open} handleClose={handleClose} teamMember={newTeamMember} />
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<TeamCards />
			</Grid>

			<Grid item xs={12} sm={6} md={4} lg={4}>
				<DailyTotalsForm />
			</Grid>

			{/* row 3 */}
			<Grid item xs={12} md={8} lg={8}>
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<Typography variant="h5">Daily Totals</Typography>
					</Grid>
					<Grid item>
						<Stack direction="row" alignItems="center" spacing={0}>
							<Button size="small" onClick={() => setTimePeriod('day')}>
								Day
							</Button>
							<Button size="small" onClick={() => setTimePeriod('week')}>
								Week
							</Button>
							<Button size="small" onClick={() => setTimePeriod('month')}>
								Month
							</Button>
							<Button size="small" onClick={() => setTimePeriod('year')}>
								Year
							</Button>
						</Stack>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TimePeriodTable timePeriod={timePeriod} />
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<DailyTotalsTable />
			</Grid>

			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">
					Weekly Totals {weekStart} - {weekEnd}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={6}>
				<WeeklyTotalsTable selectedDate={selectedDate} />
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<WeeklyTipsTable selectedDate={selectedDate} />
			</Grid>

			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Carousel items={items} />
			</Grid>
		</Grid>
	);
}

export default Dashboard;
