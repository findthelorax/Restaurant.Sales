import React, { useState } from 'react';
import { Grid, Typography, Stack, Button } from '@mui/material';
// import TeamMembersList from '../components/teamMembers/teamMembersList';
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
import { TeamTotalsCards } from '../components/team/teamTotalsCard';
import useTMConfPopup from '../hooks/teamMemberCPopHook';
import Carousel from '../components/carousel';
import { StyledGridItem } from '../styles/mainLayoutStyles';

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
		<Grid container rowSpacing={3} columnSpacing={3}>
			{/* row 1 */}
			<StyledGridItem item xs={12} sm={6} md={4} lg={3} xl={2}>
				<WeeklyFoodSalesCard selectedDate={selectedDate} />
				{/* <WeeklyFoodSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} /> */}
			</StyledGridItem>
			<StyledGridItem item xs={12} sm={6} md={4} lg={3} xl={2}>
				<WeeklyBarSalesCard selectedDate={selectedDate} />
			</StyledGridItem>
			<StyledGridItem item xs={12} sm={6} md={4} lg={3} xl={2}>
				{/* {<DailyFoodSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />} */}
				{<DailyFoodSalesCard selectedDate={selectedDate} />}
			</StyledGridItem>
			<StyledGridItem item xs={12} sm={6} md={4} lg={3} xl={2}>
				{/* <DailyBarSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} /> */}
				<DailyBarSalesCard selectedDate={selectedDate} />
			</StyledGridItem>

			{/* row 2 */}
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">Team Members</Typography>
			</Grid>
			<Grid container item xs={12} sm={12} md={12} lg={12} xl={6} display="flex" flexDirection="row" gap={3}>
				<Grid item display="flex" flexDirection="column" gap={2}>
					<TeamForm />
					<TeamMemberForm />
				</Grid>
				<Grid item style={{ marginLeft: '20px' }}>
					<DailyTotalsForm />
				</Grid>
			</Grid>

			<Grid item xs={12} md={12} lg={12} xl={12}>
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<Typography variant="h5">Daily Totals</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<DailyTotalsTable />
					</Grid>
				</Grid>
			</Grid>

			{/* row 3 */}
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">
					Weekly Totals {weekStart} - {weekEnd}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={10} xl={6}>
				<WeeklyTotalsTable selectedDate={selectedDate} />
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<WeeklyTipsTable selectedDate={selectedDate} />
			</Grid>

			<Grid item xs={12} sm={6} md={4} lg={4}>
				<Carousel items={items} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4}>
				<TeamMemberConfirmationPopup open={open} handleClose={handleClose} teamMember={newTeamMember} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4}>
				<TeamCards />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4}>
				<TeamTotalsCards />
			</Grid>

			<Grid item xs={12} md={12} lg={12} xl={12}>
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<Typography variant="h5">Time Period Totals</Typography>
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
		</Grid>
	);
}

export default Dashboard;
