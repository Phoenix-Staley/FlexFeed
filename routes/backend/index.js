const express = require('express');
const app = express();

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
// const mediaRouter = require('./mediaRoutes'); // e.g., mediaRoutes.js

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
// app.use('/media', mediaRouter);

module.exports = router;