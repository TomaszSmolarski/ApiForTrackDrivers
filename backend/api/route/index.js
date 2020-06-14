const express = require('express');
const {show} = require('./controller');
const router = express.Router();

router.get("/", show);

module.exports = router;
