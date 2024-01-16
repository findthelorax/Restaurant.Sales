const { TeamMember } = require('../models/database');
const { Team } = require('../models/database');
const moment = require('moment');
require('dotenv').config();

function validateDailyTotal(dailyTotal) {
	dailyTotal.date = moment.utc(dailyTotal.date);
	return (
		dailyTotal.date && dailyTotal.foodSales && dailyTotal.barSales && dailyTotal.nonCashTips && dailyTotal.cashTips
	);
}

exports.getTeamMember = async (req, res) => {
	const teamMemberId = req.params.teamMemberId;
	if (!teamMemberId) {
		return res.status(400).json({
			success: false,
			message: 'Team member ID is required',
		});
	}
	try {
		const teamMember = await TeamMember.findById(teamMemberId);
		if (!teamMember) {
			return res.status(404).json({
				success: false,
				message: 'Team member not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: teamMember,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			success: false,
			error: err,
		});
	}
};

exports.createTeamMember = async (req, res) => {
	const { teamMemberFirstName, teamMemberLastName, position, teams } = req.body;
	if (!teamMemberFirstName || !teamMemberLastName || !position) {
		return res.status(400).json({ error: 'Both first name, last name and position are required' });
	}

	const newMember = new TeamMember({ teamMemberFirstName, teamMemberLastName, position, teams });

	try {
		const savedMember = await newMember.save();

		// Update the team document
		const team = await Team.findById(teams[0]); // Assuming teams is an array of team IDs
		if (!team) {
			return res.status(404).json({ error: 'Team not found' });
		}
		team.teamMembers.push(savedMember._id);
		await team.save();

		res.status(201).json(savedMember);
	} catch (error) {
		if (error.code === 11000) {
			res.status(400).json({
				error: `A team member ${teamMemberFirstName} ${teamMemberLastName} - ${position} already exists.`,
			});
		} else {
			res.status(400).send({ message: error.message });
		}
	}
};

exports.updateTeamMember = async (req, res) => {
	const { teamMemberFirstName, teamMemberLastName, position, teamId } = req.body;
	const teamMemberId = req.params.teamMemberId;

	if (!teamMemberFirstName || !teamMemberLastName || !position) {
		return res.status(400).json({ error: 'Both first name, last name and position are required' });
	}

	try {
		const updatedMember = await TeamMember.findByIdAndUpdate(
			teamMemberId,
			{ teamMemberFirstName, teamMemberLastName, position, teamId },
			{ new: true }
		);

		if (!updatedMember) {
			return res.status(404).json({ error: 'Team member not found' });
		}

		res.json(updatedMember);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteTeamMember = async (req, res) => {
	const teamMemberId = req.params.teamMemberId;
	const teamMember = await TeamMember.findById(teamMemberId);
	if (!teamMember) {
		return res.status(404).json({
			success: false,
			message: 'Team member not found',
		});
	}
	try {
		const deleted = await TeamMember.findByIdAndDelete(teamMemberId);
		if (!deleted) throw new Error('Deletion failed');
		res.json({
			message: `Team member ${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName} (${teamMember.position}) was deleted`,
		});
	} catch (error) {
		console.error(`Error deleting team member ${teamMemberId}:`, error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Get All Team Members
exports.getTeamMembers = async (req, res) => {
	try {
		const teamMembers = await TeamMember.find();
		res.json(teamMembers);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// Get All Daily Totals
exports.getAllDailyTotals = async (req, res, next) => {
	try {
		const teamMembers = await TeamMember.find({});
		const dailyTotalsAll = teamMembers.flatMap((teamMember) => teamMember.dailyTotals);
		res.json(dailyTotalsAll);
	} catch (error) {
		console.error(`Error getting daily totals: ${error.message}`);
		next(error);
	}
};

// Get All Weekly Totals
exports.getAllWeeklyTotals = async (req, res, next) => {
	try {
		const teamMembers = await TeamMember.find({});
		const weeklyTotalsAll = teamMembers.flatMap((teamMember) => teamMember.weeklyTotals);
		res.json(weeklyTotalsAll);
	} catch (error) {
		console.error(`Error getting weekly totals: ${error.message}`);
		next(error);
	}
};

// Route to get daily totals for a specific team member
exports.getDailyTotals = async (req, res) => {
	try {
		const { teamMemberId } = req.params;
		const teamMember = await TeamMember.findById(teamMemberId);

		if (!teamMember) {
			return res.status(404).json({ error: 'Team member not found' });
		}
		res.json(teamMember.dailyTotals);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

exports.getDailyTotal = async (req, res) => {
	try {
		const { teamMemberId, dailyTotalId } = req.params;

		const teamMember = await TeamMember.findById(teamMemberId);
		if (!teamMember) {
			return res.status(404).send({ message: 'Team member not found' });
		}

		const dailyTotalIndex = teamMember.dailyTotals.findIndex(
			(dailyTotal) => dailyTotal._id.toString() === dailyTotalId
		);
		if (dailyTotalIndex === -1) {
			return res.status(404).send({ message: 'Daily total not found' });
		}

		const dailyTotal = teamMember.dailyTotals[dailyTotalIndex];
		res.json(dailyTotal);
	} catch (error) {
		console.error('Error getting daily total:', error);
		res.status(500).json({ error: error.message });
	}
};

//* Using schema

// Remove a daily total
exports.removeDailyTotal = async (req, res) => {
	try {
		const { teamMemberId, dailyTotalId } = req.params;

		const teamMember = await TeamMember.findById(teamMemberId);
		if (!teamMember) {
			return res.status(404).send({ message: 'Team member not found' });
		}

		try {
			teamMember.removeDailyTotal(dailyTotalId);
			teamMember.markModified('dailyTotals');
			await teamMember.save();
			res.send({ message: 'Daily total deleted successfully' });
		} catch (err) {
			console.error('Error deleting daily total:', err);
			next(err);
		}
	} catch (error) {
		console.error('Error deleting daily total:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

// Get weekly totals
exports.getWeeklyTotals = async (req, res) => {
	try {
		const teamMember = await TeamMember.findById(req.params.id);
		if (!teamMember) {
			return res.status(404).send();
		}

		const weeklyTotal = teamMember.getWeeklyTotals(req.query.weekStart);
		res.send(weeklyTotal);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Create daily totals for a specific team member
exports.createDailyTotal = async (req, res) => {
	try {
		const { teamMemberId } = req.params;
		const dailyTotal = req.body;

		// Validate dailyTotal
		if (!validateDailyTotal(dailyTotal)) {
			return res.status(400).json({
				success: false,
				message: 'dailyTotal must have all required fields.',
			});
		}

		// Check if a daily total for the same date and teamMember already exists
		const existingEntry = await TeamMember.findOne({
			_id: teamMemberId,
			dailyTotals: { $elemMatch: { date: dailyTotal.date } },
		});

		if (existingEntry) {
			return res.status(400).json({
				success: false,
				message: 'A daily total for this date and team member already exists.',
			});
		}

		// Find the team member
		const teamMember = await TeamMember.findById(teamMemberId);

		// Update the team member's daily totals
		teamMember.addDailyTotal(dailyTotal);
		// teamMember.updateWeeklyTotals();

		// Mark the dailyTotals field as modified
		teamMember.markModified('dailyTotals');

		// Save the team member
		await teamMember.save();

		res.status(200).json({
			success: true,
			message: 'Daily totals submitted successfully',
		});
	} catch (error) {
		console.error('Error processing dailyTotals request:', error);
		res.status(500).json({
			success: false,
			message: 'Failed to submit daily totals',
		});
	}
};

// Delete daily totals for a specific team member
exports.deleteDailyTotal = async (req, res) => {
	try {
		const { teamMemberId, dailyTotalId } = req.params;

		const teamMember = await TeamMember.findById(teamMemberId);
		if (!teamMember) {
			return res.status(404).send({ message: 'Team member not found' });
		}

		const dailyTotalIndex = teamMember.dailyTotals.findIndex(
			(dailyTotal) => dailyTotal._id.toString() === dailyTotalId
		);
		if (dailyTotalIndex === -1) {
			return res.status(404).send({ message: 'Daily total not found' });
		}

		// Save the date of the daily total before removing it
		const dailyTotalDate = teamMember.dailyTotals[dailyTotalIndex].date;

		teamMember.dailyTotals.splice(dailyTotalIndex, 1);
		teamMember.updateWeeklyTotals(dailyTotalDate);
		teamMember.markModified('dailyTotals');

		try {
			await teamMember.save();
			res.send({ message: 'Daily total deleted successfully' });
		} catch (err) {
			console.error('Error deleting daily total:', err);
			next(err);
		}
	} catch (error) {
		console.error('Error deleting daily total:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

// Update daily totals for a specific team member
exports.updateDailyTotal = async (req, res) => {
	try {
		const { teamMemberId, dailyTotalId } = req.params;
		console.log("🚀 ~ file: TeamMembersController.js:330 ~ exports.updateDailyTotal= ~ req.params:", req.params)
		const updatedDailyTotal = req.body;
		console.log("🚀 ~ file: TeamMembersController.js:332 ~ exports.updateDailyTotal= ~ req.body:", req.body)

		const teamMember = await TeamMember.findById(teamMemberId);

		if (!teamMember) {
			return res.status(404).json({ message: 'Team member not found' });
		}

		// Find the daily total to update
		const dailyTotal = teamMember.dailyTotals.id(dailyTotalId);

		if (!dailyTotal) {
			return res.status(404).json({ message: 'Daily total not found' });
		}

		// Update the daily total
		dailyTotal.set(updatedDailyTotal);
		teamMember.updateWeeklyTotals();
		teamMember.markModified('dailyTotals');

		try {
			await teamMember.save();
		} catch (saveError) {
			console.error('Error saving team member:', saveError);
			throw saveError;
		}

		res.status(200).json({
			success: true,
			message: 'Daily total updated successfully',
		});
	} catch (error) {
		console.error('Error updating daily total:', error);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

// Route to get all weekly totals for a specific team member
exports.getOneTMWeeklyTotals = async (req, res) => {
	try {
		const { teamMemberId } = req.params;
		const teamMember = await TeamMember.findById(teamMemberId).select('weeklyTotals');

		if (!teamMember) {
			return res.status(404).json({ error: 'Team member not found' });
		}
		res.json(teamMember.weeklyTotals);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// Route to get a specific team member's weekly totals for a specific week
exports.getOneWeeklyTotals = async (req, res) => {
	try {
		const teamMember = await TeamMember.findById(req.params.teamMemberId);

		if (!teamMember) {
			return res.status(404).json({ message: 'Team member not found' });
		}

		// Parse the week parameter into a Date object
		const weekStart = moment(req.params.week);

		const weeklyTotal = teamMember.getWeeklyTotals(weekStart);

		if (!weeklyTotal) {
			return res.status(404).json({ message: 'Weekly total not found' });
		}

		res.status(200).json(weeklyTotal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Route to create a specific team member's weekly totals for a specific week
exports.createWeeklyTotals = async (req, res) => {
	try {
		const memberId = req.params.teamMemberId;
		const week = req.params.week;
		const weeklyTotalsData = { ...req.body, week };

		await TeamMember.updateOne({ _id: memberId }, { $push: { weeklyTotals: weeklyTotalsData } });

		const teamMember = await TeamMember.findById(memberId);
		res.json(teamMember.weeklyTotals);
	} catch (error) {
		console.error('Error adding weekly totals:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Delete a specific team member's weekly totals for a specific week
exports.deleteWeeklyTotals = async (req, res) => {
	try {
		const memberId = req.params.teamMemberId;
		const week = req.params.week;
		const teamMember = await TeamMember.findById(memberId);

		// Filter out the week to be deleted
		// teamMember.weeklyTotals = teamMember.weeklyTotals.filter(total => total.week !== week);
		teamMember.weeklyTotals = teamMember.weeklyTotals.filter((total) => total.week !== week.toString());
		await teamMember.save();
		res.json({
			message: `Weekly totals for the week ${week} for team member ${memberId} deleted`,
		});
	} catch (error) {
		console.error(`Error deleting weekly totals for team member ${memberId}:`, error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.updateWeeklyTotalsPut = async (req, res) => {
	try {
		const teamMember = await TeamMember.findById(req.params.teamMemberId);

		if (!teamMember) {
			return res.status(404).json({ message: 'Team member not found' });
		}

		// Create a new date using moment and set it to the start of the week
		const weekStartLocal = moment().local().startOf('week').toDate();
		const weekStart = moment().startOf('week').toDate();

		const existingWeeklyTotal = teamMember.weeklyTotals.find((total) =>
			moment(total.week).local().startOf('week').isSame(weekStart, 'week')
		);
		if (existingWeeklyTotal) {
			return res.status(400).json({ message: 'Weekly total for this week already exists' });
		}

		teamMember.updateWeeklyTotals();

		await teamMember.save();

		res.status(200).json(teamMember);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateWeeklyTotalsPatch = async (req, res) => {
	try {
		// Parse the date string from the client using moment
		const weekStartLocal = moment(req.params.week).local().startOf('day').toDate();
		const weekStart = moment(req.params.week).startOf('week').toDate();

		// Check for existing weekly total for the same week
		const existingWeeklyTotal = await TeamMember.findOne({
			_id: req.params.teamMemberId,
			'weeklyTotals.week': weekStart,
		});
		if (existingWeeklyTotal) {
			return res.status(400).json({ message: 'Weekly total for this week already exists' });
		}

		const result = await TeamMember.updateOne(
			{ _id: req.params.teamMemberId, 'weeklyTotals.week': weekStart },
			{
				$set: {
					'weeklyTotals.$[elem].foodSales': req.body.foodSales,
					'weeklyTotals.$[elem].barSales': req.body.barSales,
					'weeklyTotals.$[elem].nonCashTips': req.body.nonCashTips,
					'weeklyTotals.$[elem].cashTips': req.body.cashTips,
					'weeklyTotals.$[elem].barTipOuts': req.body.barTipOuts,
					'weeklyTotals.$[elem].runnerTipOuts': req.body.runnerTipOuts,
					'weeklyTotals.$[elem].hostTipOuts': req.body.hostTipOuts,
					'weeklyTotals.$[elem].totalTipOut': req.body.totalTipOut,
					'weeklyTotals.$[elem].tipsReceived': req.body.tipsReceived,
					'weeklyTotals.$[elem].totalPayrollTips': req.body.totalPayrollTips,
				},
			},
			{
				arrayFilters: [{ 'elem.week': weekStart }],
			}
		);

		if (result.nModified === 0) {
			return res.status(404).json({ message: 'Weekly total not found' });
		}

		res.status(200).json({ message: 'Weekly total updated' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Work Schedule
exports.createWorkSchedule = async (req, res) => {
	try {
		const updatedTeamMember = await TeamMember.findByIdAndUpdate(
			req.params.teamMemberId,
			{ workSchedule: req.body.workSchedule },
			{ new: true }
		);
		res.json(updatedTeamMember);
	} catch (err) {
		res.json({ message: err });
	}
};

exports.getWorkSchedule = async (req, res) => {
	try {
		const teamMember = await TeamMember.findById(req.params.teamMemberId);
		res.json({ workSchedule: teamMember.workSchedule });
	} catch (err) {
		res.json({ message: err });
	}
};

exports.addWorkDate = async (req, res) => {
	try {
		const teamMember = await TeamMember.findById(req.params.teamMemberId);
		const updatedTeamMember = await teamMember.addWorkDate(req.body.workDate);
		res.json(updatedTeamMember);
	} catch (err) {
		res.json({ message: err });
	}
};

exports.removeWorkDate = async (req, res) => {
	try {
		const updatedTeamMember = await TeamMember.findByIdAndUpdate(
			req.params.teamMemberId,
			{ $pull: { workSchedule: req.body.workDate } },
			{ new: true }
		);
		res.json(updatedTeamMember);
	} catch (err) {
		res.json({ message: err });
	}
};