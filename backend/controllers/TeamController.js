const { Team } = require('../models/database');

exports.createTeam = async (req, res) => {
    const team = new Team(req.body);
    try {
        await team.save();
        res.status(201).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.send(teams);
    } catch (error) {
        res.status(500).send();
    }
};

exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId).populate('teamMembers');
        if (!team) {
            return res.status(404).send();
        }
        res.send(team);
    } catch (error) {
        res.status(500).send();
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, { new: true, runValidators: true });
        if (!team) {
            return res.status(404).send();
        }
        res.send(team);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.teamId);
        if (!team) {
            return res.status(404).send();
        }
        res.send(team);
    } catch (error) {
        res.status(500).send();
    }
};

exports.addTeamMember = async (req, res) => {
    const teamId = req.params.teamId;
    const teamMemberId = req.body.teamMemberId;

    try {
        const team = await Team.findById(teamId);
        const teamMember = await TeamMember.findById(teamMemberId);

        if (!team || !teamMember) {
            return res.status(404).send();
        }

        // Add the team member to the team
        team.teamMembers.push(teamMemberId);
        await team.save();

        res.status(201).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.removeTeamMember = async (req, res) => {
    const teamId = req.params.teamId;
    const teamMemberId = req.body.teamMemberId;

    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send();
        }

        // Remove the team member from the team
        team.teamMembers.pull(teamMemberId);
        await team.save();

        res.send(team);
    } catch (error) {
        res.status(400).send(error);
    }
};