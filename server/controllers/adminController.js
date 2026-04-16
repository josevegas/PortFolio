const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Social = require('../models/Social');
const Info = require('../models/Info');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

// Auth
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Projects
exports.getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Skills
exports.getAdminSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Socials
exports.getAdminSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSocial = async (req, res) => {
  try {
    const { platform } = req.body;
    if (platform && !['github', 'linkedin'].includes(platform)) {
      return res.status(400).json({ message: 'Solo se permite github o linkedin' });
    }
    const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(social);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Info
exports.getAdminInfo = async (req, res) => {
  try {
    const info = await Info.find();
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await Info.findByIdAndUpdate(id, req.body, { new: true });
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mensaje eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
