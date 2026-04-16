const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Auth
router.post('/login', adminController.login);

// All routes below are protected
router.use(auth);

// Projects
router.get('/projects', adminController.getAdminProjects);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Skills
router.get('/skills', adminController.getAdminSkills);
router.post('/skills', adminController.createSkill);
router.put('/skills/:id', adminController.updateSkill);
router.delete('/skills/:id', adminController.deleteSkill);

// Socials
router.get('/socials', adminController.getAdminSocials);
router.put('/socials/:id', adminController.updateSocial);

// Info
router.get('/info', adminController.getAdminInfo);
router.put('/info/:id', adminController.updateInfo);

// Messages
router.get('/messages', adminController.getMessages);
router.patch('/messages/:id', adminController.updateMessageStatus);
router.delete('/messages/:id', adminController.deleteMessage);

module.exports = router;
