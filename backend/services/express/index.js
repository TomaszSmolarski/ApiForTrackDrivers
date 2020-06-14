const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressConfig = (apiRoot, routes) => {
    const app = express();
    app.use(cookieParser(process.env.COOKIES_SECRET));
    app.use(morgan('dev'));
    app.use(cors({credentials: true, origin: `http://localhost:3000`}));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(apiRoot, routes);

    // 404 Error handler
    app.use((req, res, next) => res.status(404).send({error: 'Routing not found'}));

    // 400 Error handler
    app.use((err, req, res, next) => {
        if (err.name === 'CastError')
            return res.status(400).end();
        if (err.name === 'ValidationError')
            return res.status(400).json({error: err.message});
        // handle other errors
        // Otherwise...
        return res.status(500).end();
    });

    return app
};

module.exports = expressConfig;
