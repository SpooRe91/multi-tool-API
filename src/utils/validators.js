const User = require("../models/User");
const { getErrorMessage } = require("./errorHelpers");
require("dotenv").config();

exports.registerValidator = async (req, res, next) => {
    const { email, password, rePassword } = req.body;
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    try {
        if (existing) {
            throw new Error("Невалиден e-mail или парола!");
        }

        if (password !== rePassword) {
            throw new Error("Паролите трябва да съвпадат!");
        }
        next();
    } catch (error) {
        res.status(403).json({ message: getErrorMessage(error) });
    }
};

exports.portfolioValidator = async (req, res, next) => {
    const utilKey = req.headers["x-secret-key"];

    try {
        if (!utilKey) {
            throw new Error("Need a utilKey to validate yourself!");
        }
        if (utilKey !== process.env.PORTFOLIO_UTIL_KEY) {
            throw new Error("Incorrect utilKey!");
        }
        console.log("Util key validated successfully.");
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(403).json({ message: getErrorMessage(error) });
    }
};