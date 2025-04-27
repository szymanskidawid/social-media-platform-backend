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
    !req.body.type ||
    !req.body.time_sent
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

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing notification id" });
  }

  try {
    const deletedNotification = await Notifications.findByIdAndDelete(
      id
    );

    if (!deletedNotification) {
      return res
        .status(404)
        .json({ error: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      deletedNotification,
    });
  } catch (error) {
    console.error("Cannot remove notification: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
