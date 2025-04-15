// routes/index.js
const express = require('express');
const router = express.Router();

// Load sub-routes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const mediaRoutes = require('./mediaRoutes'); // <— file in the same folder

// Attach sub-routes
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/media', mediaRoutes);

// Export the main router
module.exports = router;
