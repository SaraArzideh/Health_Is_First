const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json(result.error);
        }
        next();
    };
};

module.exports = validationMiddleware;