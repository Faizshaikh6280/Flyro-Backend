const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400, // 24 hours in seconds , It will delete this token after 24 hours
  },
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);