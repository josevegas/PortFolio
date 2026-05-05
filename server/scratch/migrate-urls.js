const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const migrateUrls = async () => {
  const publicUrlBase = process.env.R2_PUBLIC_URL;
  if (!publicUrlBase) {
    console.error('❌ Error: R2_PUBLIC_URL no está definida en el .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const projects = await Project.find();
    
    console.log('--- Iniciando migración de URLs de imágenes ---');
    
    for (let project of projects) {
      if (project.image.includes('r2.cloudflarestorage.com')) {
        // Extraemos el key (lo que va después de /images/)
        // La URL vieja es: https://...com/images/projects/archivo.png
        const parts = project.image.split('/images/');
        if (parts.length > 1) {
          const key = parts[1];
          const newUrl = `${publicUrlBase}/${key}`;
          
          console.log(`Actualizando "${project.title}":`);
          console.log(`  Vieja: ${project.image}`);
          console.log(`  Nueva: ${newUrl}`);
          
          project.image = newUrl;
          await project.save();
        }
      }
    }
    
    console.log('✅ Migración completada con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
};

migrateUrls();
