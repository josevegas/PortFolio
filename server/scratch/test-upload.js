const { uploadImage } = require('../services/imageService');
const fs = require('fs');
const path = require('path');

const testUpload = async () => {
  console.log('--- Probando subida de imagen real a Cloudflare R2 ---');
  
  // Creamos un buffer de imagen dummy (un pixel transparente)
  const dummyImageBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 
    'base64'
  );

  try {
    const result = await uploadImage(
      dummyImageBuffer, 
      'test-connection.png', 
      'image/png', 
      'tests'
    );
    
    console.log('✅ Subida exitosa!');
    console.log('Key guardada:', result.key);
    console.log('URL generada:', result.url);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la subida:');
    console.error(error.message);
    process.exit(1);
  }
};

testUpload();
