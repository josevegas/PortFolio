const axios = require('axios'); // Oh wait, axios is not installed. I'll use fetch if available.
require('dotenv').config();

const testCloudflareAPI = async () => {
  const accountId = process.env.CLOUD_API; // Tienes el account ID aquí
  const token = process.env.CLOUD_TOKEN;
  const bucketName = process.env.R2_BUCKET_NAME;

  console.log('--- Probando conexión vía Cloudflare API (no S3) ---');
  console.log('Account ID:', accountId);
  console.log('Bucket:', bucketName);

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`;
    
    // En Node 18+ fetch está disponible globalmente
    const response = await fetch(url, {
      method: 'GET', // List objects
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Conexión exitosa vía Cloudflare API!');
      console.log('Buckets objects retrieved.');
      process.exit(0);
    } else {
      console.error('❌ Error de conexión vía API:');
      console.error('Status:', response.status);
      console.error('Data:', JSON.stringify(data, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
    process.exit(1);
  }
};

testCloudflareAPI();
