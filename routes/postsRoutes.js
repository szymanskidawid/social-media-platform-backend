const express = require("express");
const Posts = require("../models/postsModel");
const { default: mongoose } = require("mongoose");

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

router.post("/add", async (req, res) => {
  const { userId, time_posted, post_message, post_photo } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    const post = new Posts({
      user_id: objectId,
      time_posted,
      post_message,
      post_photo,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error while creating a new post: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addLike", async (req, res) => {});

router.delete("/delete", async (req, res) => {});

router.delete("/deleteLike", async (req, res) => {});

module.exports = router;
