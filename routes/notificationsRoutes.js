const express = require("express");
const Notifications = require("../models/notificationsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Notifications.find({});

  res.json(data);
});

module.exports = router;
