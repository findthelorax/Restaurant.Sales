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

function WeeklyFoodSalesCardRender({ selectedDate, salesDifferences, sx, totalWeeklyFoodSales }) {
	console.log('🚀 ~ file: weeklyTotalsCardsRender.js:92 ~ salesDifferences:', salesDifferences);
	const { teamMembers } = useContext(TeamMembersContext);
	if (!teamMembers) {
		return <CircularProgress />;
	}
	const formattedTotalWeeklyFoodSales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		totalWeeklyFoodSales
	);

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
							{formattedTotalWeeklyFoodSales}
						</Typography>
					</Stack>
					<StyledSalesAvatar>
						<SvgIcon fontSize="medium">
							<GiHamburger />
						</SvgIcon>
					</StyledSalesAvatar>
				</Stack>
				{formattedDifference && (
					<Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
						<Stack alignItems="center" direction="row" spacing={0.5}>
							<SvgIcon
								color={difference === 0 ? 'disabled' : positive ? success : error}
								fontSize="small"
							>
								{difference === 0 ? <FaUtensils /> : positive ? <FaArrowUp /> : <FaArrowDown />}
							</SvgIcon>
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
};
function WeeklyBarSalesCardRender({
	selectedDate,
	salesDifferences = { barSales: { difference: 0, positive: 0 } },
	sx,
	totalWeeklyBarSales,
}) {
	const { teamMembers } = useContext(TeamMembersContext);
	if (!teamMembers) {
		return <CircularProgress />;
	}
	const formattedTotalWeeklyBarSales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		totalWeeklyBarSales
	);

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
						<Typography variant="h5">
							{formattedTotalWeeklyBarSales}
						</Typography>
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
							<SvgIcon
								color={difference === 0 ? 'disabled' : 'positive' ? 'success' : 'error'}
								fontSize="small"
							>
								{difference === 0 ? <FaWhiskeyGlass /> : positive ? <FaArrowUp /> : <FaArrowDown />}
							</SvgIcon>
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
};

export { WeeklyBarSalesCardRender, WeeklyFoodSalesCardRender };