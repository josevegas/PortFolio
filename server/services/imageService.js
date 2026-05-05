const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, bucketName } = require('../config/s3Config');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

/**
 * Sube una imagen a Cloudflare R2
 * @param {Buffer} fileBuffer - El buffer de la imagen
 * @param {string} fileName - El nombre original del archivo
 * @param {string} contentType - El tipo de contenido (image/jpeg, etc)
 * @param {string} folder - Carpeta opcional (ej: 'projects')
 * @returns {Promise<{key: string, url: string}>} - El key y la URL pública (estimada)
 */
const uploadImage = async (fileBuffer, fileName, contentType, folder = 'uploads') => {
  const key = `${folder}/${Date.now()}-${fileName.replace(/\s/g, '_')}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    
    // Si existe una URL pública configurada (r2.dev o dominio propio), la usamos.
    // De lo contrario, usamos el endpoint de S3 (que requiere firma).
    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${key}`
      : `${process.env.S3_API}/${bucketName}/${key}`;
    
    return { key, url: publicUrl };
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw new Error(`No se pudo subir la imagen a Cloudflare: ${error.message}`);
  }
};

/**
 * Obtiene una URL firmada para ver la imagen (útil si el bucket es privado)
 * @param {string} key - El key del archivo en R2
 * @returns {Promise<string>} - URL firmada
 */
const getSignedImageUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error('Error getting signed URL from R2:', error);
    throw new Error('No se pudo obtener la URL de la imagen');
  }
};

/**
 * Elimina una imagen de Cloudflare R2
 * @param {string} key - El key del archivo a eliminar
 */
const deleteImage = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting image from R2:', error);
    throw new Error('No se pudo eliminar la imagen de Cloudflare');
  }
};

module.exports = {
  uploadImage,
  getSignedImageUrl,
  deleteImage,
};
