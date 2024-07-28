// emailValidator.js
const { body, validationResult } = require("express-validator");
const xss = require("xss-clean");

const sanitizeInput = [
    xss(),
    body("firstName")
        .trim()
        .escape(),
    body("lastName")
        .trim()
        .escape(),
    body("email")
        .normalizeEmail()
        .trim()
        .escape(),
    body("message")
        .trim()
        .escape(),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    handleValidationErrors,
    sanitizeInput,
};
