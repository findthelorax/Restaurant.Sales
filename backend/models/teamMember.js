const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Team = require('./team');

const DailyTotalSchema = new mongoose.Schema({
	date: Date,
	foodSales: Number,
	barSales: Number,
	nonCashTips: Number,
	cashTips: Number,
	barTipOuts: Number,
	runnerTipOuts: Number,
	hostTipOuts: Number,
	totalTipOut: Number,
	tipsReceived: Number,
	totalPayrollTips: Number,
});

const WeeklyTotalSchema = new mongoose.Schema({
	weekStart: Date,
	weekEnd: Date,
	foodSales: Number,
	barSales: Number,
	nonCashTips: Number,
	cashTips: Number,
	barTipOuts: Number,
	runnerTipOuts: Number,
	hostTipOuts: Number,
	totalTipOut: Number,
	tipsReceived: Number,
	totalPayrollTips: Number,
});

const TeamMemberSchema = new mongoose.Schema({
	teamMemberFirstName: String,
	teamMemberLastName: String,
	position: String,
	teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
	workSchedule: [{
		type: Date
	}],
	timeZone: {
		type: String,
		default: 'UTC',
	},
	dailyTotals: [DailyTotalSchema],
	weeklyTotals: [WeeklyTotalSchema],
});

TeamMemberSchema.index({ teamMemberFirstName: 1, teamMemberLastName: 1, position: 1 }, { unique: true });
TeamMemberSchema.index({ 'workSchedule': 1 });
TeamMemberSchema.index({ 'dailyTotals.date': 1 });
TeamMemberSchema.index({ 'weeklyTotals.weekStart': 1 });


/* 
To efficiently compare the dailyTotals date with the workSchedule dates for team members on the same team, you can use the following approach:

Create an index on the workSchedule and dailyTotals.date fields in the TeamMemberSchema to speed up the search operation. MongoDB supports indexing on array fields.

When adding a new dailyTotal, fetch the workSchedule of all team members on the same team. You can use the $in operator to match the teams field with the team ID.

Use the $elemMatch operator to find team members who have the dailyTotal date in their workSchedule. This operator matches documents where the array field contains at least one element that satisfies all the specified query criteria.

Here is the pseudocode for the operation:

1. Create index on workSchedule and dailyTotals.date in TeamMemberSchema
2. When adding a new dailyTotal:
	1. Fetch the workSchedule of all team members on the same team using $in operator
	2. Use $elemMatch operator to find team members who have the dailyTotal date in their workSchedule

And here is the MongoDB query in JavaScript:

// Assuming `teamId` is the ID of the team and `newDailyTotalDate` is the date of the new daily total
TeamMember.find({
	teams: teamId,
	workSchedule: {
		$elemMatch: {
			$eq: newDailyTotalDate
		}
	}
}).then(teamMembers => {
	// `teamMembers` now contains all team members on the same team who have the `newDailyTotalDate` in their work schedule
});

Remember to replace teamId and newDailyTotalDate with the actual team ID and new daily total date.

To efficiently update the dailyTotals of team members who have the same workSchedule date as a new dailyTotal, you can use the following approach:

Use the $elemMatch operator to find team members who have the dailyTotal date in their workSchedule. This operator matches documents where the array field contains at least one element that satisfies all the specified query criteria.

Use the $push operator to add the new dailyTotal to the dailyTotals array of the matched team members.

Here is the pseudocode for the operation:

1. Use $elemMatch operator to find team members who have the dailyTotal date in their workSchedule
2. Use $push operator to add the new dailyTotal to the dailyTotals array of the matched team members

And here is the MongoDB query in JavaScript:

// Assuming `teamId` is the ID of the team and `newDailyTotal` is the new daily total object
TeamMember.updateMany({
	teams: teamId,
	workSchedule: {
		$elemMatch: {
			$eq: newDailyTotal.date
		}
	}
}, {
	$push: {
		dailyTotals: newDailyTotal
	}
}).then(result => {
	// `result` contains the result of the update operation
});

Remember to replace teamId and newDailyTotal with the actual team ID and new daily total object.

Once you've created the indexes on workSchedule and dailyTotals.date, MongoDB will automatically use these indexes when performing queries that involve these fields. This can significantly speed up the search operation. You don't need to do anything else to use the indexes.

For example, if you're querying for team members who have a specific date in their workSchedule, MongoDB will use the index on workSchedule to speed up the query:

TeamMember.find({
	workSchedule: {
		$elemMatch: {
			$eq: someDate
		}
	}
}).then(teamMembers => {
	// `teamMembers` now contains all team members who have `someDate` in their work schedule
});

Similarly, if you're querying for team members who have a specific date in their dailyTotals.date, MongoDB will use the index on dailyTotals.date to speed up the query:

TeamMember.find({
	'dailyTotals.date': {
		$eq: someDate
	}
}).then(teamMembers => {
	// `teamMembers` now contains all team members who have `someDate` in their daily totals
});

Remember to replace someDate with the actual date you're querying for.

*/

TeamMemberSchema.pre('save', function (next) {
	if (this.teamMemberFirstName && this.isModified('teamMemberFirstName')) {
		this.teamMemberFirstName = this.teamMemberFirstName.charAt(0).toUpperCase() + this.teamMemberFirstName.slice(1);
	}
	if (this.teamMemberLastName && this.isModified('teamMemberLastName')) {
		this.teamMemberLastName = this.teamMemberLastName.charAt(0).toUpperCase() + this.teamMemberLastName.slice(1);
	}
	next();
});

TeamMemberSchema.methods.addDailyTotal = function (dailyTotal) {
	// Add the daily total
	this.dailyTotals.push(dailyTotal);

	// Get the start of the week for the daily total
	const weekStart = moment(dailyTotal.date).startOf('week').toDate();
	const weekEnd = moment(dailyTotal.date).endOf('week').toDate();

	// Find the index of the corresponding weekly total
	const index = this.weeklyTotals.findIndex((total) => total.weekStart === weekStart);

	// If the weekly total doesn't exist, create it
	if (index === -1) {
		this.weeklyTotals.push({
			weekStart: weekStart,
			weekEnd: weekEnd,
			foodSales: dailyTotal.foodSales,
			barSales: dailyTotal.barSales,
			nonCashTips: dailyTotal.nonCashTips,
			cashTips: dailyTotal.cashTips,
			barTipOuts: dailyTotal.barTipOuts,
			runnerTipOuts: dailyTotal.runnerTipOuts,
			hostTipOuts: dailyTotal.hostTipOuts,
			totalTipOut: dailyTotal.totalTipOut,
			tipsReceived: dailyTotal.tipsReceived,
			totalPayrollTips: dailyTotal.totalPayrollTips,
		});
	} else {
		// If the weekly total exists, update it
		this.weeklyTotals[index].foodSales += dailyTotal.foodSales;
		this.weeklyTotals[index].barSales += dailyTotal.barSales;
		this.weeklyTotals[index].nonCashTips += dailyTotal.nonCashTips;
		this.weeklyTotals[index].cashTips += dailyTotal.cashTips;
		this.weeklyTotals[index].barTipOuts += dailyTotal.barTipOuts;
		this.weeklyTotals[index].runnerTipOuts += dailyTotal.runnerTipOuts;
		this.weeklyTotals[index].hostTipOuts += dailyTotal.hostTipOuts;
		this.weeklyTotals[index].totalTipOut += dailyTotal.totalTipOut;
		this.weeklyTotals[index].tipsReceived += dailyTotal.tipsReceived;
		this.weeklyTotals[index].totalPayrollTips += dailyTotal.totalPayrollTips;
	}
};

TeamMemberSchema.methods.removeDailyTotal = function (dailyTotalId) {
	const dailyTotalIndex = this.dailyTotals.findIndex((dailyTotal) => dailyTotal._id.toString() === dailyTotalId);

	if (dailyTotalIndex === -1) {
		throw new Error('Daily total not found');
	}

	// Save the date of the daily total before removing it
	const dailyTotalDate = this.dailyTotals[dailyTotalIndex].date;

	// Remove the daily total
	this.dailyTotals.splice(dailyTotalIndex, 1);

	// Update the weekly totals
	this.updateWeeklyTotals(dailyTotalDate);
};

TeamMemberSchema.pre('save', function (next) {
	// Update the weekly totals
	this.dailyTotals.forEach((dailyTotal) => {
		this.updateWeeklyTotals(dailyTotal.date);
	});

	next();
});

TeamMemberSchema.pre('remove', async function (next) {
    const teamMember = this;

    // Find the team that the member is part of and remove the member from it
    await Team.updateMany(
        { teamMembers: teamMember._id },
        { $pull: { teamMembers: teamMember._id } }
    );

    next();
});

TeamMemberSchema.methods.updateWeeklyTotals = function (dailyTotalDate) {
	// Get the start and end of the current week
	const weekStart = moment.utc(dailyTotalDate).startOf('week').toDate();
	const weekEnd = moment.utc(dailyTotalDate).endOf('week').toDate();

	// Filter the daily totals for the current week
	const thisWeeksDailyTotals = this.dailyTotals.filter((total) => {
		const date = moment(total.date);
		return date.isSameOrAfter(weekStart) && date.isSameOrBefore(weekEnd);
	});

	// Calculate the weekly total for the current week
	const weeklyTotal = thisWeeksDailyTotals.reduce(
		(acc, curr) => ({
			weekStart: weekStart,
			weekEnd: weekEnd,
			foodSales: acc.foodSales + curr.foodSales,
			barSales: acc.barSales + curr.barSales,
			nonCashTips: acc.nonCashTips + curr.nonCashTips,
			cashTips: acc.cashTips + curr.cashTips,
			barTipOuts: acc.barTipOuts + curr.barTipOuts,
			runnerTipOuts: acc.runnerTipOuts + curr.runnerTipOuts,
			hostTipOuts: acc.hostTipOuts + curr.hostTipOuts,
			totalTipOut: acc.totalTipOut + curr.totalTipOut,
			tipsReceived: acc.tipsReceived + curr.tipsReceived,
			totalPayrollTips: acc.totalPayrollTips + curr.totalPayrollTips,
		}),
		{
			weekStart: weekStart,
			weekEnd: weekEnd,
			foodSales: 0,
			barSales: 0,
			nonCashTips: 0,
			cashTips: 0,
			barTipOuts: 0,
			runnerTipOuts: 0,
			hostTipOuts: 0,
			totalTipOut: 0,
			tipsReceived: 0,
			totalPayrollTips: 0,
		}
	);

	// Find the existing weekly total for the current week
	const existingWeeklyTotalIndex = this.weeklyTotals.findIndex(
		(total) => total.weekStart.getTime() === weekStart.getTime()
	);

	// Update the existing weekly total or add a new one
	if (existingWeeklyTotalIndex !== -1) {
		this.weeklyTotals[existingWeeklyTotalIndex] = weeklyTotal;
	} else {
		this.weeklyTotals.push(weeklyTotal);
	}

	// After updating the weekly totals, check if all values are 0
	if (
		weeklyTotal.foodSales === 0 &&
		weeklyTotal.barSales === 0 &&
		weeklyTotal.nonCashTips === 0 &&
		weeklyTotal.cashTips === 0 &&
		weeklyTotal.barTipOuts === 0 &&
		weeklyTotal.runnerTipOuts === 0 &&
		weeklyTotal.hostTipOuts === 0 &&
		weeklyTotal.totalTipOut === 0 &&
		weeklyTotal.tipsReceived === 0 &&
		weeklyTotal.totalPayrollTips === 0
	) {
		// If all values are 0, remove the weekly total
		const index = this.weeklyTotals.indexOf(weeklyTotal);
		this.weeklyTotals.splice(index, 1);
	}
};

TeamMemberSchema.methods.getWeeklyTotals = function (weekStart) {
	const weekEnd = moment(weekStart).endOf('week').toDate();

	const weeklyTotal = this.weeklyTotals.find(
		(total) =>
			moment(total.weekStart).isSameOrAfter(weekStart, 'day') &&
			moment(total.weekEnd).isSameOrBefore(weekEnd, 'day')
	);

	return weeklyTotal;
};

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema, 'teamMembers');

module.exports = TeamMember;
