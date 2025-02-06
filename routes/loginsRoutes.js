const express = require("express");
const Logins = require("../models/loginsModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Required fields are missing." });
  }

  try {
    const user = await Logins.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    if (password !== user.password) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error while logging in: ", error);
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
    const existingAccount = await Logins.findOne({ email });

    if (existingAccount) {
      return res.status(400).json({ error: "Email already used" });
    }

    const newAccount = new Logins({ email, password });

    await newAccount.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error while creating a new account: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
