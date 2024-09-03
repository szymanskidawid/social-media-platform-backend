const express = require("express");
const Notifications = require("../models/notificationsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Notifications.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Cannot fetch notifications: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
