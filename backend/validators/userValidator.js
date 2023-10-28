const { body } = require('express-validator');

exports.userValidationRules = () => {
  return [
    body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];
};