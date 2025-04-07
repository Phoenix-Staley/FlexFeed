const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve("views/index.html"));
});

module.exports = router;