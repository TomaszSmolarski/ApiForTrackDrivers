const {Router} = require('express');
const users = require('./users');
const transits = require('./transits');
const route = require('./route');
// Routing
const router = Router();
router.use('/users', users);
router.use('/transits', transits);
router.use('/route', route);

module.exports = router;
