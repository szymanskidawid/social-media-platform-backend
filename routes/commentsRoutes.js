const express = require("express");
const Comments = require("../models/commentsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Comments.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch comments: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
