const express = require("express");
const Comments = require("../models/commentsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Comments.find({});

  res.json(data);
});

module.exports = router;
