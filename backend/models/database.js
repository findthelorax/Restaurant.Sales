const mongoose = require('mongoose');
const TeamMember = require('./teamMember');
const Team = require('./team');
const { User } = require('./user');
require('dotenv').config();

const db = mongoose.createConnection(process.env.MONGODB_URL);

const UserModel = db.model('User', User.schema, 'users');
const TeamModel = db.model('Team', Team.schema, 'teams');
const TeamMemberModel = db.model('TeamMember', TeamMember.schema, 'teamMembers');

module.exports = { User: UserModel, Team: TeamModel, TeamMember: TeamMemberModel };