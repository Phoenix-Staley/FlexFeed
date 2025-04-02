//Summary
//Easiest for a demo: just do a single route with Multer, handle file uploads in your backend, push them to S3, return the URL.
//For delete, provide a simple endpoint that calls s3.deleteObject.
//For front end, a basic <form> or JavaScript fetch() with FormData is enough to test it out.



require('dotenv').config();  // If you want to load AWS keys from a .env file
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();

// 1) Set up Multer (stores the uploaded file in a "temp" folder by default)
const upload = multer({ dest: 'temp/' });

// 2) Configure the AWS S3 SDK
// Make sure these environment variables are set in your .env file, or just inline them here (not recommended for production).
// .env would have:
// AWS_ACCESS_KEY=YOURACCESSKEY
// AWS_SECRET_KEY=YOURSECRETKEY
// AWS_REGION=us-east-1  (or whatever region)
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// 3) Upload Endpoint (POST /api/upload)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Multer stores the file info in req.file
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file from the temp folder
    const fileStream = fs.createReadStream(file.path);

    // Construct upload params
    const params = {
      Bucket: 'YOUR_S3_BUCKET_NAME',        // e.g. 'my-demo-bucket'
      Key: `uploads/${file.originalname}`,  // Folder + file name in S3
      Body: fileStream,
      ContentType: file.mimetype,
    };

    // Upload to S3
    const uploadResult = await s3.upload(params).promise();

    // Clean up local temp file
    fs.unlinkSync(file.path);

    // Return the S3 URL to the client
    return res.json({
      message: 'Upload successful!',
      url: uploadResult.Location,  // The direct URL to the file in S3
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong during upload' });
  }
});

// 4) Delete Endpoint (DELETE /api/delete)
// Expects a "key" query param or body param that references the S3 object key
app.delete('/api/delete', async (req, res) => {
  try {
    const { key } = req.query; // or req.body
    if (!key) {
      return res.status(400).json({ error: 'Missing "key" for the S3 object' });
    }

    // Delete the object from S3
    await s3.deleteObject({
      Bucket: 'YOUR_S3_BUCKET_NAME',
      Key: key,
    }).promise();

    return res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong during deletion' });
  }
});

// 5) Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
