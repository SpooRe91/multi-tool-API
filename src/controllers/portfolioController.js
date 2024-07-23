const router = require("express").Router();
const { portfolioValidator } = require("../utils/validators");
const data = require("../_portfolio-data.json");
const { getErrorMessage } = require("../utils/errorHelpers");

router.post("/portfolio", portfolioValidator, async (req, res) => {
    try {
        console.log("Incoming request validated successfully.");
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in portfolio route:", error);
        res.status(500).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;
