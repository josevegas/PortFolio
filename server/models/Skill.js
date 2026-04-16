const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100 },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', SkillSchema);
