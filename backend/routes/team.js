const express = require('express');
const teamController = require('../controllers/TeamController');
const router = new express.Router();

router.post('/teams', teamController.createTeam);
router.get('/teams', teamController.getTeams);
router.get('/teams/:teamId', teamController.getTeam);
router.patch('/teams/:teamId', teamController.updateTeam);
router.delete('/teams/:teamId', teamController.deleteTeam);

router.post('/teams/:teamId/teamMembers', teamController.addTeamMember);
router.post('/teams/:teamId/removeTeamMember', teamController.removeTeamMember);

module.exports = router;