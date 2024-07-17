const router = require("express").Router();
const TaskUser = require("../models/TaskUser");
const { modelValidator } = require("../middlewares/modelValidatorMiddleware");
const userService = require("../services/taskUserService");
const { getErrorMessage } = require("../utils/errorHelpers");
const { createTaskUserValidator } = require("../middlewares/taskUserMiddleware");

// Get all users
router.get("/allUsers", async (req, res) => {
    try {
        const users = await userService.getAllTaskUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: getErrorMessage(error) });
    }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const result = await userService.deleteTaskUserById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).send({ message: getErrorMessage(error) });
    }
});

router.post("/create", modelValidator(TaskUser), createTaskUserValidator, async (req, res) => {
    try {
        const newUser = await userService.createTaskUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send({ message: getErrorMessage(error) });
    }
});
module.exports = router;