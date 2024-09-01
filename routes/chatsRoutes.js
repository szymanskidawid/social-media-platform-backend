const express = require("express");
const Chats = require("../models/chatsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Chats.find({});

  res.json(data);
});

module.exports = router;
