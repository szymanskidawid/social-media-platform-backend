const express = require("express");
const People = require("../models/peopleModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await People.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Cannot fetch people: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
