const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/projects', publicController.getProjects);
router.get('/skills', publicController.getSkills);
router.get('/socials', publicController.getSocials);
router.get('/info', publicController.getInfo);
router.post('/contact', publicController.postContact);

module.exports = router;
