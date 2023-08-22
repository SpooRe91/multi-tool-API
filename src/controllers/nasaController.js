const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");

router.get("/pod", async (req, res) => {
  try {
    const result = axios
      .create({ baseURL: "https://api.nasa.gov/" })
      .get(`planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    const data = await result;

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

router.get("/articles/", async (req, res) => {
  const query = req.query.query;
  const forbidden = ["javascript", "script", "code", "/", ":", "<", ">", "\\"];

  if (forbidden.includes(query.toLowerCase())) {
    return res.status(400).json("ERROR: Invalid query search!");
  }

  try {
    const result = axios
      .create({ baseURL: "https://api.spaceflightnewsapi.net/" })
      .get(
        `/v4/articles/?limit=20&ordering=updated_at&search=${query.toLowerCase()}`
      );

    const data = await result;

    if (data.data.count !== 0 && data.status >= 200 && data.status <= 300) {
      return res.status(data.status || 200).json(data.data);
    }

    if (data.data.count === 0) {
      return res
        .status(data.status || 200)
        .json("Sorry, there are no results!");
    }
  } catch (error) {
    if (typeof error === "string") {
      res.status(data.status || 400).json({ message: error.toUpperCase() });
    } else if (error instanceof Error) {
      res.status(data.status || 400).json(error.message);
    }
  }
});

module.exports = router;
