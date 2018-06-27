// Require libraries
const morgan = require('morgan');
const express = require('express');
const app = express();

global.app = {
    rootDir: __dirname,
    version: '1.0.0'
}

// Require routes
const imageRoutes = require('./api/routes/v1/Image');

// Add error handling middlewear
app.use(morgan('dev'));
// Body parser middlewear.
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// CORS middlewear
app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if('OPTIONS' === req.method) {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Set root dir
app.use((req, res, next) => {
    req.appDir = __dirname;
    next();
});

// Routes which should handle requests
app.use('/v1/image', imageRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status || 500
        }
    });
});

module.exports = app;
