import React, { useState } from 'react';
import moment from 'moment';
import { Grid, Box, Typography, Stack, Button, Skeleton } from '@mui/material';

function Dashboard() {
	const [timePeriod, setTimePeriod] = useState('day');

	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			{/* row 1 */}
			{/* <Grid item xs={12} sm={6} md={4} lg={3}>
				<WeeklyFoodSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<WeeklyBarSalesCard selectedDate={selectedDate} weeklyDifferences={weeklyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<DailyFoodSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<DailyBarSalesCard selectedDate={selectedDate} dailyDifferences={dailyDifferences} />
			</Grid> */}

			{/* row 2 */}
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
						</Stack>
					</Grid>
				</Grid>
		</Grid>
	);
}

export default Dashboard;
