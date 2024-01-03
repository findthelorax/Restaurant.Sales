import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { FaArrowUp, FaArrowDown, FaWhiskeyGlass, FaUtensils } from 'react-icons/fa6';
import { CiBeerMugFull } from 'react-icons/ci';
import { GiHamburger } from 'react-icons/gi';
import { success, error } from '../../theme/colors';
import { CardContent, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { StyledSalesAvatar, StyledSalesCard } from '../../styles/mainLayoutStyles';

function WeeklyFoodSalesCardRender({ selectedDate, salesDifferences, sx, selectedWeeklyFoodSales }) {
	const { teamMembers } = useContext(TeamMembersContext);
	if (!teamMembers) {
		return <CircularProgress />;
	}
	const formattedSelectedWeeklyFoodSales = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(selectedWeeklyFoodSales);

	const difference = salesDifferences.foodSales?.difference || 0;
	const positive = salesDifferences.foodSales?.positive || 0;
	const formattedDifference = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		difference
	);

	const startDate = moment(selectedDate).startOf('week').format('MM/DD');
	const endDate = moment(selectedDate).endOf('week').format('MM/DD');

	return (
		<StyledSalesCard>
			<CardContent>
				<Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline">
							Food Sales {startDate}&nbsp;-&nbsp;{endDate}
						</Typography>
						<Typography variant="h5" sx={{ overflowWrap: 'break-word' }}>
							{formattedSelectedWeeklyFoodSales}
						</Typography>
					</Stack>
					<StyledSalesAvatar>
						<GiHamburger fontSize="large" />
					</StyledSalesAvatar>
				</Stack>
				{formattedDifference && (
					<Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
						<Stack alignItems="center" direction="row" spacing={0.5}>
							{difference === 0 ? (
								<FaUtensils fontSize="small" />
							) : positive ? (
								<FaArrowUp fontSize="small" />
							) : (
								<FaArrowDown fontSize="small" />
							)}

							<Typography color={positive ? success.main : error.main} variant="body2">
								{formattedDifference}%
							</Typography>
						</Stack>
						<Typography color="text.secondary" variant="caption">
							Since last week
						</Typography>
					</Stack>
				)}
			</CardContent>
		</StyledSalesCard>
	);
}

WeeklyFoodSalesCardRender.propTypes = {
	selectedDate: PropTypes.object.isRequired,
	sx: PropTypes.object,
	salesDifferences: PropTypes.shape({
		foodSales: PropTypes.object,
	}),
	selectedWeeklyFoodSales: PropTypes.number.isRequired,
};

function WeeklyBarSalesCardRender({
	selectedDate,
	salesDifferences = { barSales: { difference: 0, positive: 0 } },
	sx,
	selectedWeeklyBarSales,
}) {
	const { teamMembers } = useContext(TeamMembersContext);
	if (!teamMembers) {
		return <CircularProgress />;
	}
	const formattedSelectedWeeklyBarSales = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(selectedWeeklyBarSales);

	const startDate = moment(selectedDate).startOf('week').format('MM/DD');
	const endDate = moment(selectedDate).endOf('week').format('MM/DD');

	const difference = salesDifferences.barSales?.difference || 0;
	const positive = salesDifferences.barSales?.positive || 0;
	const formattedDifference = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		difference
	);

	return (
		<StyledSalesCard>
			<CardContent>
				<Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline">
							Bar Sales {startDate}&nbsp;-&nbsp;{endDate}
						</Typography>
						<Typography variant="h5">{formattedSelectedWeeklyBarSales}</Typography>
					</Stack>
					<StyledSalesAvatar>
						<SvgIcon fontSize="medium">
							<CiBeerMugFull />
						</SvgIcon>
					</StyledSalesAvatar>
				</Stack>
				{formattedDifference && (
					<Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
						<Stack alignItems="center" direction="row" spacing={0.5}>
							{difference === 0 ? (
								<FaWhiskeyGlass fontSize="small" />
							) : positive ? (
								<FaArrowUp fontSize="small" />
							) : (
								<FaArrowDown fontSize="small" />
							)}
							<Typography color={positive ? success.main : error.main} variant="body2">
								{formattedDifference}%
							</Typography>
						</Stack>
						<Typography color="text.secondary" variant="caption">
							Since last week
						</Typography>
					</Stack>
				)}
			</CardContent>
		</StyledSalesCard>
	);
}

WeeklyBarSalesCardRender.propTypes = {
	selectedDate: PropTypes.object.isRequired,
	sx: PropTypes.object,
	salesDifferences: PropTypes.shape({
		barSales: PropTypes.object,
	}),
	selectedWeeklyBarSales: PropTypes.number.isRequired,
};

export { WeeklyBarSalesCardRender, WeeklyFoodSalesCardRender };