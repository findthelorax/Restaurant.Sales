import React, { useState, useContext } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import {
	StyledDTFCard,
	StyledBox,
	StyledTextField,
	StyledFormControl,
	PinkStyledButton,
} from '../../styles/mainLayoutStyles';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import { DailyTotalsContext } from '../../contexts/DailyTotalsContext';
import { CalculateTipOuts } from '../../hooks/tipOuts';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { useUpdateTeamMemberTipOuts } from '../../hooks/updateTeamMemberTipOuts';

export function DailyTotalsForm() {
	const { teamMembers } = useContext(TeamMembersContext);
	const { submitDailyTotalToServer } = useContext(DailyTotalsContext);
	const [selectedTeamMember, setSelectedTeamMember] = useState('');
	const today = moment().format('YYYY-MM-DD');
	const [date, setDate] = useState(today);
	const [foodSales, setFoodSales] = useState('');
	const [barSales, setBarSales] = useState('');
	const [nonCashTips, setNonCashTips] = useState('');
	const [cashTips, setCashTips] = useState('');
	const updateTeamMemberTipOuts = useUpdateTeamMemberTipOuts();

	const fields = [
		{ id: 'foodSales', label: 'Food Sales', value: foodSales, setValue: setFoodSales },
		{ id: 'barSales', label: 'Bar Sales', value: barSales, setValue: setBarSales },
		{ id: 'nonCashTips', label: 'Non-Cash Tips', value: nonCashTips, setValue: setNonCashTips },
		{ id: 'cashTips', label: 'Cash Tips', value: cashTips, setValue: setCashTips },
	];

	const handleSubmit = (event) => {
		event.preventDefault();

		const newDailyTotal = {
			teamMemberId: selectedTeamMember,
			date: date,
			foodSales: parseFloat(foodSales) || 0,
			barSales: parseFloat(barSales) || 0,
			nonCashTips: parseFloat(nonCashTips) || 0,
			cashTips: parseFloat(cashTips) || 0,
		};
		const tipOuts = CalculateTipOuts(newDailyTotal, selectedTeamMember, teamMembers);
		console.log("🚀 ~ file: dailyTotalsForm.js:46 ~ handleSubmit ~ teamMembers:", teamMembers)
		console.log("🚀 ~ file: dailyTotalsForm.js:46 ~ handleSubmit ~ selectedTeamMember:", selectedTeamMember)
		console.log("🚀 ~ file: dailyTotalsForm.js:46 ~ handleSubmit ~ newDailyTotal:", newDailyTotal)
		console.log('🚀 ~ file: dailyTotalsForm.js:46 ~ handleSubmit ~ tipOuts:', tipOuts);

		// try {
		//     // Include the calculated tip outs when you submit the daily totals
		//     const data = submitDailyTotalToServer({tipOuts: tipOuts, ...otherFields }, selectedTeamMember);
		//     console.log('Success:', data);
		// } catch (error) {
		//     console.error('Error:', error);
		// }

		submitDailyTotalToServer(newDailyTotal);
		updateTeamMemberTipOuts(date, position, tipOut, dailyTotals);
		setSelectedTeamMember('');
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
						value={selectedTeamMember}
						label="Team Member"
						onChange={(e) => setSelectedTeamMember(e.target.value)}
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
						onValueChange={(values) => field.setValue(values.value || 0)}
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
