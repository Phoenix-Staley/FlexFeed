require('dotenv').config({ path: __dirname + '/accesscode.env' });
console.log('🔐 AWS access key:', process.env.AWS_ACCESS_KEY_ID);

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error("❌ AWS credentials missing from environment!");
  process.exit(1);
}

const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// AWS config – move to environment variables in production
/* const s3 = new AWS.S3({
  accessKeyId: 'AKIA33EAVCUCDSLNF44J',
  secretAccessKey: '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',
  region: 'us-west-2'
});
 */

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure multer to use S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'flexfeed',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `uploads/${Date.now()}-${uuidv4()}.${fileExtension}`;
      console.log(`📁 Uploading file with key: ${fileName}`);
      cb(null, fileName);
    }
  })
});

// POST /api/media/upload
router.post('/upload', upload.single('media'), (req, res) => {
  try {
    if (!req.file) {
      console.error("🚫 No file found in request.");
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log('✅ File uploaded to S3:', req.file);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      fileUrl: req.file.location,
      key: req.file.key
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error uploading file to S3.',
      error: error.message
    });
  }
});

module.exports = router;
