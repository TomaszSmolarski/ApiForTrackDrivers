const bodyParser = require('body-parser');
require('dotenv/config');
const {env, port, ip, apiRoot} = require('./config');
const express = require('./services/express');
const api = require('./api');

const mongoose = require('./services/mongoose');
const app = express(apiRoot, api);


app.listen(port, () => {
    console.log(`Express server listening on http://${ip}:${port}, in ${env} mode`)
});


module.exports = app;
