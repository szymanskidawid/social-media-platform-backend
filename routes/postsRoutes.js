const express = require("express");
const Posts = require("../models/postsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Posts.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch posts: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {});

router.post("/addLike", async (req, res) => {});

router.delete("/delete", async (req, res) => {});

router.delete("/deleteLike", async (req, res) => {});

module.exports = router;
