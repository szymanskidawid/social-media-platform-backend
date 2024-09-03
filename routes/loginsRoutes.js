const express = require("express");
const Logins = require("../models/loginsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Logins.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Cannot fetch logins: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
