// to validate request data
//(can create specific validation function for each route by using libraries like 'express-validator')
// for example:
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;