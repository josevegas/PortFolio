const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_API,
  credentials: {
    accessKeyId: process.env.CLOUD_API,
    secretAccessKey: process.env.CLOUD_API_SECRET,
  },
  forcePathStyle: true,
});

module.exports = { s3Client, bucketName: process.env.R2_BUCKET_NAME };
