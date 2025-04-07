const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve("pages/index.html"));
});

module.exports = router;