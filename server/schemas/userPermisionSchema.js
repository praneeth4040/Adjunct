const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  email: { type: String, required: true },
});

const UserPermission = mongoose.model('UserPermission', userSchema);

module.exports = UserPermission;
