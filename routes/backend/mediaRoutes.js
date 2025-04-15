// Load environment variables from .env file
//require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Define AWS credentials directly
const s3 = new AWS.S3({
  accessKeyId: 'AKIA33EAVCUCDSLNF44J',
  secretAccessKey: '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',
  region: 'us-west-2'
});

// Configure multer to use multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'flexfeed', 
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      cb(null, fileName);
    }
  })
});


// POST /api/media/upload
// Expects a form-data body with field name 'media'
router.post('/upload', upload.single('media'), (req, res) => {
  try {
    // The uploaded file info is in req.file.
    // `req.file.location` is the public S3 URL if acl=public-read
    // or you can store req.file.key somewhere (DB, etc.) if you need to retrieve it later
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      fileUrl: req.file.location,
      key: req.file.key // If you prefer to store only the S3 key
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error uploading file to S3.',
      error
    });
  }
});

// GET /api/media/:key
// This route streams the file from S3 and sends it to the client
router.get('/:key', async (req, res) => {
  const { key } = req.params;
  const downloadParams = {
    Bucket: 'flexfeed',
    Key: key
  };

  try {
    const data = await s3.getObject(downloadParams).promise();
    // Set the appropriate content type so it renders, e.g. 'image/jpeg'
    res.setHeader('Content-Type', data.ContentType || 'application/octet-stream');
    return res.send(data.Body);
  } catch (error) {
    console.error('S3 retrieval error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving file from S3',
      error
    });
  }
});

module.exports = router;
