const router = require("express").Router();
const { getErrorMessage } = require("../utils/errorHelpers");
require("dotenv").config();
const axios = require("axios");

router.get("/pod", async (req, res) => {
  try {
    const result = axios
      .create({ baseURL: "https://api.nasa.gov/" })
      .get(`planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    const data = await result;
    console.log(data.data);
    if (data.status === 200) {
      res.status(200).json(data.data);
    }
  } catch (error) {
    if (typeof error === "string") {
      res.status(400).json({ message: error.toUpperCase() });
    } else if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
});
module.exports = router;
