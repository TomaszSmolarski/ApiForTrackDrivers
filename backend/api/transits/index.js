const express = require('express');
const {create, index, show, stat, update, destroy} = require('./controller');
const router = express.Router();
const verify = require('../../middlewares/verifyToken');

router.get('/', verify, index);

router.get('/byID/:ID', verify, show);

router.get('/stats', verify, stat);

router.delete('/:transitID', verify, destroy);

router.patch('/:transitID', verify, update);

router.post('/', verify, create);

module.exports = router;
