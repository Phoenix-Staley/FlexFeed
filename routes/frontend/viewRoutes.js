const router = require('express').Router();
const path = require('node:path');

router.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve("./public/index.html"));
});

router.get('/:postID', (req, res) => {
    res.status(200).sendFile(path.resolve("./public/pages/post.html"));
});

module.exports = router;