const express = require("express");
const Notifications = require("../models/notificationsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Notifications.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch notifications: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  const newNotificationData = req.body;

  if (
    !req.body.user_id ||
    !req.body.notified_user_id ||
    !req.body.type
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newNotification = new Notifications(newNotificationData);
    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Cannot send notification: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove", async (req, res) => {});

module.exports = router;
