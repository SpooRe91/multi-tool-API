const mongoose = require("mongoose");

const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$/;

const taskUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email address is required!"],
        unique: true,
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: "Email address has to be in a valid format.",
        },
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
    },
});

const TaskUser = mongoose.model("TaskUser", taskUserSchema);
module.exports = TaskUser;
