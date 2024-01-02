const express = require('express');
const router = express.Router();
const TeamMembersController = require('../controllers/TeamMembersController');

router.get('/allDailyTotals', TeamMembersController.getAllDailyTotals);
router.get('/allWeeklyTotals', TeamMembersController.getAllWeeklyTotals);

router.get('/:teamMemberId', TeamMembersController.getTeamMember);
router.post("/", TeamMembersController.createTeamMember);
router.put('/:teamMemberId', TeamMembersController.updateTeamMember);
router.delete('/:teamMemberId', TeamMembersController.deleteTeamMember);

router.get('/', TeamMembersController.getTeamMembers);

router.get('/:teamMemberId/dailyTotals', TeamMembersController.getDailyTotals);
router.get('/:teamMemberId/dailyTotals/:dailyTotalId', TeamMembersController.getDailyTotal);
router.post('/:teamMemberId/dailyTotals', TeamMembersController.createDailyTotal);
router.delete('/:teamMemberId/dailyTotals/:dailyTotalId', TeamMembersController.removeDailyTotal);

router.get('/:teamMemberId/weeklyTotals/', TeamMembersController.getOneTMWeeklyTotals);

router.get('/:teamMemberId/weeklyTotals/:week', TeamMembersController.getOneWeeklyTotals);
router.post('/:teamMemberId/weeklyTotals/:week', TeamMembersController.createWeeklyTotals);
router.delete('/:teamMemberId/weeklyTotals/:week', TeamMembersController.deleteWeeklyTotals);

router.put('/:teamMemberId/updateWeeklyTotals', TeamMembersController.updateWeeklyTotalsPut);
router.patch('/:teamMemberId/weeklyTotals/:week', TeamMembersController.updateWeeklyTotalsPatch);

// Get a team member's work schedule
router.get('/:teamMemberId/workSchedule', TeamMembersController.getWorkSchedule);

// Create a new work schedule for a team member
router.post('/:teamMemberId/workSchedule', TeamMembersController.createWorkSchedule);

// Add a date to a team member's work schedule
router.put('/:teamMemberId/workSchedule', TeamMembersController.addWorkDate);

// Remove a date from a team member's work schedule
router.put('/:teamMemberId/workSchedule/delete', TeamMembersController.removeWorkDate);

module.exports = router;