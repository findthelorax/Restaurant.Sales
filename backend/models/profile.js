const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    city: String,
    country: { type: String, default: 'USA' },
    timezone: { type: String, default: 'UTC' },
});

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles');

module.exports = { Profile, ProfileSchema };