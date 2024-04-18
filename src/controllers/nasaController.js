const router = require("express").Router();
require("dotenv").config();
const { AxiosError } = require("axios");
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

router.get("/images/", async (req, res) => {
  const { query } = req.query;
  console.log();
  try {
    const imagesApi = axios.create({ baseURL: "https://nasa-api-explorer.vercel.app/api/" });
    const result = await imagesApi.get(
      `images?q=${query}`
      // `search?q=${query}&media_type=image&page_size=20&page=${page ? page : 1}`
    );
    if (!result) {
      return
    };
    res.status(200).json(result.data);
  } catch (error) {
    const { response: { status }, message } = error;
    res.status(status || 400).json(message);
  }
});

router.get("/articles/", async (req, res) => {
  const query = req.query.query;
  const forbidden = ["javascript", "script", "code", "/", ":", "<", ">", "\\"];

  if (!query || query === undefined) {
    return res.status(400).json("Please provide a query!");
  }

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

    if (data.status >= 200 && data.status <= 300) {
      console.log(data.status);
      if (data.data.count !== 0) {
        console.log(data.data);
        return res.status(data.status || 200).json(data.data);

      } else {
        console.log(data.data.results);//most probably - []
        return res
          .status(data.status || 200)
          .json("Sorry, there are no results!");
      }
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
