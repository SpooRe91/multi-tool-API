// emailValidator.js
const { validationResult } = require("express-validator");
const xss = require("xss-clean");

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
    handleValidationErrors,
    sanitizeInput,
};
