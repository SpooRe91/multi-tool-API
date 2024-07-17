const TaskUser = require("../models/TaskUser");

exports.getAllTaskUsers = async () => {
    try {
        const users = await TaskUser.find({}).lean();
        return users;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
};

exports.deleteTaskUserById = async (id) => {
    try {
        const result = await TaskUser.findByIdAndDelete(id);
        if (!result) {
            throw new Error("User not found");
        }
        return result;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};

exports.createTaskUser = async (userData) => {
    try {
        const newUser = new TaskUser(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};