// emailValidator.js
const { body, validationResult } = require("express-validator");
const xss = require("xss-clean");

// Email validator middleware
const validateEmail = [
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
];

const sanitizeInput = [xss()];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateEmail,
    handleValidationErrors,
    sanitizeInput,
};
