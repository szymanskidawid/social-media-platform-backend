const express = require("express");
const Posts = require("../models/postsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Posts.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Cannot fetch posts: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
