const express = require("express");
const Logins = require("../models/loginsModel");
const { default: mongoose } = require("mongoose");

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

router.put("/update", async (req, res) => {
  const { loginId, /*pswrd,*/ firstLogin } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(loginId);
    const user = await Logins.findById(objectId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /*if (pswrd !== "") {
      user.password = pswrd;
    }*/

    if (typeof firstLogin === "boolean") {
      user.first_login = firstLogin;
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Login details updated succesfully" });
  } catch (error) {
    console.error("Cannot update login details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
