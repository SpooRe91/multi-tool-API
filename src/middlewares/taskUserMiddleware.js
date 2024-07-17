const TaskUser = require("../models/TaskUser");
const { getErrorMessage } = require("../utils/errorHelpers");

exports.createTaskUserValidator = async (req, res, next) => {
    const { email } = req.body;
    const existing = await TaskUser.findOne({ email: new RegExp(`^${email}$`, "i") });

    try {
        if (existing) {
            throw new Error("e-mail is already taken or invalid");
        }
        next();
    } catch (error) {
        res.status(403).json({ message: getErrorMessage(error) });
    }
};