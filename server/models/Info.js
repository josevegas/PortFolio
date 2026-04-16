const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  type: { type: String, enum: ['text', 'textarea', 'url'], default: 'text' }
});

module.exports = mongoose.model('Info', InfoSchema);
