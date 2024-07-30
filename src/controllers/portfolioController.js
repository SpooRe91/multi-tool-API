const router = require("express").Router();
const { portfolioValidator } = require("../utils/validators");
const data = require("../_portfolio-data.json");
const { getErrorMessage } = require("../utils/errorHelpers");
const nodemailer = require("nodemailer");
const validator = require("validator");

const { sanitizeInput, handleValidationErrors } = require("../middlewares/emailValidator");
const { emailTemplate } = require("../utils/emailTemplate");

require("dotenv").config();

router.get("/portfolio", portfolioValidator, async (req, res) => {
    try {
        console.log("Incoming request validated successfully.");
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in portfolio route:", error);
        res.status(500).json({ message: getErrorMessage(error) });
    }
});

router.post("/contact", sanitizeInput, handleValidationErrors, async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    const sanitizedFirstName = validator.escape(firstName);
    const sanitizedLastName = validator.escape(lastName);
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedMessage = validator.escape(message);

    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.MY_MAIL,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MY_MAIL,
        to: process.env.MAIL_TO,
        subject: `PORTFOLIO APP MAIL: From ${sanitizedFirstName} ${sanitizedLastName}`,
        text: `Name: ${sanitizedFirstName} ${sanitizedLastName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
        html: emailTemplate(sanitizedFirstName, sanitizedLastName, sanitizedEmail, sanitizedMessage),
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

module.exports = router;
