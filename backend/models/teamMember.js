const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

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
    timeZone: {
        type: String,
        default: 'UTC',
    },
    dailyTotals: [DailyTotalSchema],
    weeklyTotals: [WeeklyTotalSchema],
});

TeamMemberSchema.index({ teamMemberFirstName: 1, teamMemberLastName: 1, position: 1 }, { unique: true });

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
	console.log("🚀 ~ file: teamMember.js:58 ~ dailyTotal:", dailyTotal)
	// Add the daily total
	this.dailyTotals.push(dailyTotal);

	// Get the start of the week for the daily total
	const weekStart = moment(dailyTotal.date).startOf('week').format('YYYY-MM-DD');
    const weekEnd = moment(dailyTotal.date).endOf('week').format('YYYY-MM-DD');

	// Find the index of the corresponding weekly total
	const index = this.weeklyTotals.findIndex((total) => total.weekStart.toISOString() === weekStart);

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

TeamMemberSchema.methods.updateWeeklyTotals = function () {
    // Get the start and end of the current week
    const weekStart = moment().startOf('week').toDate();
    const weekEnd = moment().endOf('week').toDate();

    // Filter the daily totals for the current week
    const thisWeeksDailyTotals = this.dailyTotals.filter((total) => {
        const date = moment(total.date);
        return date.isSameOrAfter(weekStart) && date.isSameOrBefore(weekEnd);
    });

    // Calculate the weekly total for the current week
    const weeklyTotal = thisWeeksDailyTotals.reduce((acc, curr) => ({
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
    }), {
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
    });

    // Find the existing weekly total for the current week
	const existingWeeklyTotalIndex = this.weeklyTotals.findIndex((total) =>
    total.weekStart.toISOString() === weekStart.toISOString()
);

    // Update the existing weekly total or add a new one
    if (existingWeeklyTotalIndex !== -1) {
        this.weeklyTotals[existingWeeklyTotalIndex] = weeklyTotal;
    } else {
        this.weeklyTotals.push(weeklyTotal);
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