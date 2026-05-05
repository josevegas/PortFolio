const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { s3Client, bucketName } = require('../config/s3Config');

const testConnection = async () => {
  console.log('--- Probando conexión con Cloudflare R2 ---');
  console.log('Bucket:', bucketName);
  console.log('Endpoint:', process.env.S3_API);
  
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 1
    });
    
    const response = await s3Client.send(command);
    console.log('✅ Conexión exitosa!');
    console.log('Respuesta recibida correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.name);
    if (error.$metadata) {
      console.error('HTTP Status:', error.$metadata.httpStatusCode);
    }
    process.exit(1);
  }
};

testConnection();
