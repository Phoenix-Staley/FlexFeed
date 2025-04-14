const express = require('express');
const app = express();

const mediaRouter = require('/Users/nihalthomas/Library/CloudStorage/OneDrive-WashingtonStateUniversity(email.wsu.edu)/WSU/Senior/Semester 2/Web Dev/FlexFeed/FlexFeed/routes/backend/mediaRoutes.js'); // e.g., mediaRoutes.js
app.use('/api/media', mediaRouter);

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.user('/comment', commentRoutes);

module.exports = router;