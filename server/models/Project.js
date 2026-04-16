const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  demoUrl: { type: String },
  repoUrl: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
