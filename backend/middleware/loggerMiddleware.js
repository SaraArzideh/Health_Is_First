// to validate request data
//(We can create specific validation function for each route by using libraries like 'joi', 'express-validator')

/*
//Ensure that you have the necessary libraries installed (for example: 'npm install jwt express joi')
const { Router } = require('express');
const validationMiddleware = require('../middleware/validationMiddleware');
const { loginSchema } = require('./validationSchemas');

const router = Router();

router.post('/login', validationMiddleware(loginSchema), (req, res) => {
    // handle login
});

module.exports = router;
*/

// This is a generic example:
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;