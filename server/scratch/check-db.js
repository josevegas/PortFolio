const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const projects = await Project.find();
    console.log('--- Proyectos en Base de Datos ---');
    projects.forEach(p => {
      console.log(`Proyecto: ${p.title}`);
      console.log(`URL Imagen: ${p.image}`);
      console.log('---------------------------');
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkData();
