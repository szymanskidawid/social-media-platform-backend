const express = require("express");
const Chats = require("../models/chatsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Chats.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch chats: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {});

router.put("/update", async (req, res) => {});

router.delete("/delete", async (req, res) => {});

module.exports = router;
