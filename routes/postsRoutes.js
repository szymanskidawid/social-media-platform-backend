const express = require("express");
const Posts = require("../models/postsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Posts.find({});

  res.json(data);
});

module.exports = router;
