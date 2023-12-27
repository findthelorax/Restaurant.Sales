import React, { useState } from 'react';
import { Grid, Box, Typography, Stack, Button, Skeleton } from '@mui/material';
import TeamMembersList from '../components/teamMembers/teamMembersList';
import TeamMemberForm from '../components/teamMembers/teamMemberForm';

function Dashboard() {
	const [timePeriod, setTimePeriod] = useState('day');

	return (
		<Grid container rowSpacing={3} columnSpacing={2.5}>
			{/* row 1 */}
			{/* <Grid item xs={12} sm={6} md={3} lg={3}>
				<WeeklyFoodSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={3}>
				<WeeklyBarSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={3}>
				<DailyFoodSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={3}>
				<DailyBarSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />
			</Grid> */}

			{/* row 2 */}
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">Team Members</Typography>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={4}>
				<TeamMemberForm />
			</Grid>
			<Grid item xs={12} sm={8} md={8} lg={8}>
				<TeamMembersList />
			</Grid>

			{/* row 3 */}

			<Grid item xs={12} sx={{ mb: -2.25 }}>
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
				</Stack>
			</Grid>

			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant="h5">Weekly Totals</Typography>
			</Grid>
			
		</Grid>
	);
}

export default Dashboard;
