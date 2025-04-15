const router = require('express').Router();
const viewRoutes = require('./frontend');
const api = require('./backend');

router.use('/', viewRoutes);
router.use('/api/', api);

module.exports = router;