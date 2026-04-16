const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Social = require('../models/Social');
const Info = require('../models/Info');
const Message = require('../models/Message');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSocials = async (req, res) => {
  try {
    const socials = await Social.find({ platform: { $in: ['github', 'linkedin'] } });
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInfo = async (req, res) => {
  try {
    const info = await Info.find();
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
