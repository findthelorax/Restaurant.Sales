import React, { useState, useContext } from 'react';
import moment from 'moment';
import { InputLabel, Select, MenuItem } from '@mui/material';
import {
	StyledDTFCard,
	StyledBox,
	StyledTextField,
	StyledFormControl,
	PinkStyledButton,
} from '../../styles/mainLayoutStyles';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { NumericFormat } from 'react-number-format';
import { useSubmitDailyTotals } from '../../hooks/dailyTotals/submitDailyTotals';

export function DailyTotalsForm() {
	const { teamMembers } = useContext(TeamMembersContext);
	// const { submitDailyTotalToServer } = useContext(DailyTotalsContext);
	const [selectedTeamMember, setSelectedTeamMember] = useState(null);
	const today = moment().format('YYYY-MM-DD');
	const [date, setDate] = useState(today);
	const [foodSales, setFoodSales] = useState('');
	const [barSales, setBarSales] = useState('');
	const [nonCashTips, setNonCashTips] = useState('');
	const [cashTips, setCashTips] = useState('');
	const submitDailyTotals = useSubmitDailyTotals();

	const fields = [
		{ id: 'foodSales', label: 'Food Sales', value: foodSales, setValue: setFoodSales },
		{ id: 'barSales', label: 'Bar Sales', value: barSales, setValue: setBarSales },
		{ id: 'nonCashTips', label: 'Non-Cash Tips', value: nonCashTips, setValue: setNonCashTips },
		{ id: 'cashTips', label: 'Cash Tips', value: cashTips, setValue: setCashTips },
	];

	const handleSelectTeamMember = (event) => {
		const selectedTeamMemberId = event.target.value;
		const selectedTeamMember = teamMembers.find(member => member._id === selectedTeamMemberId);
		setSelectedTeamMember(selectedTeamMember);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const dailyTotals = {
			date,
			foodSales,
			barSales,
			nonCashTips,
			cashTips
		};

		submitDailyTotals(selectedTeamMember, dailyTotals);

		setSelectedTeamMember('');
		setDate(today);
		setFoodSales('');
		setBarSales('');
		setNonCashTips('');
		setCashTips('');
	};

	return (
		<StyledDTFCard>
			<StyledBox component="form" onSubmit={handleSubmit}>
				<StyledFormControl fullWidth margin="normal">
					<InputLabel id="selectedTeamMember">Team Member</InputLabel>
					<Select
						labelId="selectedTeamMember"
						id="selectedTeamMember"
						value={selectedTeamMember ? selectedTeamMember._id : ''}
						label="Team Member"
						onChange={handleSelectTeamMember}
						>
						<MenuItem value="" disabled>
							Select Team Member
						</MenuItem>
						{teamMembers.map((member) => (
							<MenuItem key={member._id} value={member._id}>
								{`${member.teamMemberFirstName} ${member.teamMemberLastName} - ${member.position}`}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>
				<StyledTextField
					id="date"
					label="Date"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					fullWidth
				/>
				{fields.map((field) => (
					<NumericFormat
						key={field.id}
						id={field.id}
						label={field.label}
						customInput={StyledTextField}
						thousandSeparator
						prefix="$"
						decimalScale={2}
						fixedDecimalScale
						value={field.value}
						onValueChange={(values) => field.setValue(parseFloat(values.value) || 0)}
						fullWidth
						margin="normal"
						placeholder={field.label}
					/>
				))}
				<PinkStyledButton variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
					Submit Daily Totals
				</PinkStyledButton>
			</StyledBox>
		</StyledDTFCard>
	);
}

export default DailyTotalsForm;