const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true, enum: ['github', 'linkedin'] },
  url: { type: String, required: true },
  icon: { type: String, required: true }
});

module.exports = mongoose.model('Social', SocialSchema);
