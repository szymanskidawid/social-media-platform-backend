const express = require("express");
const People = require("../models/peopleModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await People.find({});

  res.json(data);
});

module.exports = router;
