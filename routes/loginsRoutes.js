const express = require("express");
const Logins = require("../models/loginsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Logins.find({});

  res.json(data);
});

module.exports = router;
