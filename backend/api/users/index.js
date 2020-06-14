const express = require('express');
const {create, login, showMe, update, destroy} = require('./controller');
const router = express.Router();
const verify = require('../../middlewares/verifyToken')


router.get('/me', verify, showMe);

router.delete('/', verify, destroy);

router.patch('/', verify, update);

router.post('/register', create);

router.post('/login', login);


module.exports = router;
