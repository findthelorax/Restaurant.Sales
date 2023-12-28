const express = require('express');
const TeamController = require('../controllers/TeamController');
const router = new express.Router();

router.post('/teams', TeamController.createTeam);
router.get('/teams', TeamController.getTeams);
router.get('/teams/:teamId', TeamController.getTeam);
router.patch('/teams/:teamId', TeamController.updateTeam);
router.delete('/teams/:teamId', TeamController.deleteTeam);

router.post('/teams/:teamId/teamMembers', TeamController.addTeamMember);
router.post('/teams/:teamId/removeTeamMember', TeamController.removeTeamMember);

module.exports = router;