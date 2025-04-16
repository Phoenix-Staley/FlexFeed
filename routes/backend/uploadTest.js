const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Replace these with your actual values
const s3 = new AWS.S3({
  accessKeyId: 'AKIA33EAVCUCDSLNF44J',
  secretAccessKey: 'o0Gi9DCuEjCRHI2hJZ8yejusmWMihVHRWviQigeY',
  region: 'us-west-2', // change if your bucket is in another region
});

const filePath = '/Users/nihalthomas/screenshot.PNG';
console.log('📁 Attempting to read file:', filePath);

let fileContent;
try {
  fileContent = fs.readFileSync(filePath);
  console.log('✅ File read successfully.');
} catch (err) {
  console.error('❌ Error reading file:', err.message);
  process.exit(1);
}

const params = {
    Bucket: 'flexfeed',
    Key: `uploads/test-upload-${Date.now()}.png`, // ⬅ now in "uploads/" folder
    Body: fileContent,
    ContentType: 'image/png',
  };  

console.log('🚀 Attempting S3 upload...');

s3.upload(params, (err, data) => {
  if (err) {
    console.error('❌ Upload failed:', err.message);
  } else {
    console.log('✅ Upload successful!');
    console.log('🔗 File URL:', data.Location);
  }
});
