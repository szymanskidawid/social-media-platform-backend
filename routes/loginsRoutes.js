const express = require("express");
const Logins = require("../models/loginsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Logins.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch logins: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Required fields are missing." });
  }

  try {
    const newAccount = new Logins({ email, password });

    await newAccount.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error while creating a new account: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
