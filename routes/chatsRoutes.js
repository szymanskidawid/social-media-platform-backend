const express = require("express");
const Chats = require("../models/chatsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Chats.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Cannot fetch chats: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
