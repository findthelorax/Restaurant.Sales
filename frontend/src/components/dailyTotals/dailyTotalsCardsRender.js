import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaArrowUp, FaArrowDown, FaWhiskeyGlass, FaUtensils } from 'react-icons/fa6';
import { CiBeerMugFull } from 'react-icons/ci';
import { GiHamburger } from 'react-icons/gi';
import { success, error } from '../../theme/colors';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { StyledSalesCard, StyledSalesAvatar } from '../../styles/mainLayoutStyles';
export function DailyFoodSalesCardRender({
	selectedDate,
	totalFoodSales,
	salesDifferences = { foodSales: { difference: 0, positive: 0 } },
	sx,
}) {
	if (totalFoodSales === undefined) {
		return <CircularProgress />;
	}

	const formattedTotalFoodSales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		totalFoodSales
	);

	const difference = salesDifferences.foodSales?.difference || 0;
	const positive = salesDifferences.foodSales?.positive || 0;
	const formattedDifference = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		difference
	);

	const formattedDate = selectedDate.format('MM/DD');

	return (
		<StyledSalesCard>
			<CardContent>
				<Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline" noWrap>
							Food Sales {formattedDate}
						</Typography>
						<Typography variant="h5">{formattedTotalFoodSales}</Typography>
					</Stack>
					<StyledSalesAvatar>
						<GiHamburger fontSize="medium" />
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
							Since yesterday
						</Typography>
					</Stack>
				)}
			</CardContent>
		</StyledSalesCard>
	);
}

DailyFoodSalesCardRender.propTypes = {
	totalFoodSales: PropTypes.number,
	salesDifferences: PropTypes.shape({
		foodSales: PropTypes.object,
	}),
	selectedDate: PropTypes.object.isRequired,
	sx: PropTypes.object,
};
export function DailyBarSalesCardRender({
	selectedDate,
	totalBarSales,
	salesDifferences = { barSales: { difference: 0, positive: 0 } },
	sx,
}) {
	if (totalBarSales === undefined) {
		return <CircularProgress />;
	}

	const formattedTotalBarSales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		totalBarSales
	);

	const difference = salesDifferences.barSales?.difference || 0;
	const positive = salesDifferences.barSales?.positive || 0;
	const formattedDifference = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		difference
	);

	const formattedDate = selectedDate.format('MM/DD');

	return (
		<StyledSalesCard>
			<CardContent>
				<Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline" noWrap>
							Bar Sales {formattedDate}
						</Typography>
						<Typography variant="h5">{formattedTotalBarSales}</Typography>
					</Stack>
					<StyledSalesAvatar>
						<CiBeerMugFull fontSize="medium" />
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
							Since yesterday
						</Typography>
					</Stack>
				)}
			</CardContent>
		</StyledSalesCard>
	);
}

DailyBarSalesCardRender.propTypes = {
	totalBarSales: PropTypes.number,
	salesDifferences: PropTypes.shape({
		barSales: PropTypes.object,
	}),
	selectedDate: PropTypes.object.isRequired,
	sx: PropTypes.object,
};