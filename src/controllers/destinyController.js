const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");

const URL = axios.create({ baseURL: "https://www.bungie.net/Platform/" });

router.get("/clanInfo", async (req, res) => {
  try {
    const result = URL.get("GroupV2/4131725", {
      headers: {
        "content-type": "application/json",
        "X-API-Key": process.env.BUNGIE_API_KEY,
      },
    });
    const data = await result;
    if (data.status === 200) {
      res.status(200).json(data.data);
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(error.status || 400)
        .json("There is a problem with the request, please try again later!");
    }
  }
});

router.get("/getClanMembers", async (req, res) => {
  try {
    const result = URL.get("GroupV2/4131725/Members", {
      headers: {
        "content-type": "application/json",
        "X-API-Key": process.env.BUNGIE_API_KEY,
      },
    });
    const data = await result;
    if (data.status === 200) {
      res.status(200).json(data.data);
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(error.status || 400)
        .json("There is a problem with the request, please try again later!");
    }
  }
});

router.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      res.status(404).json("Please enter a valid ID");
    }
    const result = URL.get(`User/GetBungieNetUserById/${id}`, {
      headers: {
        "content-type": "application/json",
        "X-API-Key": process.env.BUNGIE_API_KEY,
      },
    });
    const data = await result;

    if (data.status >= 200 && data.status <= 302) {
      res.status(200).json(data.data);
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(error.status || 400)
        .json("There is a problem with the request, please try again later!");
    }
  }
});

router.get("/getCharacter/:param1/:param2", async (req, res) => {
  const { param1, param2 } = req.params;

  console.log(param1, param2);

  try {
    if (!param1 || !param2) {
      res
        .status(404)
        .json("Please enter valid membership type and membership ID!");
    }
    const result = URL.get(
      `Destiny2/${param1}/Account/${param2}/Character/0/Stats`,
      {
        headers: {
          "content-type": "application/json",
          "X-API-Key": process.env.BUNGIE_API_KEY,
        },
      }
    );
    const data = await result;

    if (data.status >= 200 && data.status <= 302) {
      res.status(200).json(data.data);
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(error.status || 400)
        .json("There is a problem with the request, please try again later!");
    }
  }
});
module.exports = router;
