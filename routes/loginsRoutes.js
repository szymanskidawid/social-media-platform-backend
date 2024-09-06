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

router.put("/update-user-id/:loginId", async (req, res) => {
  const { loginId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }

  try {
    const updatedLogin = Logins.findByIdAndUpdate(
      loginId,
      {
        user_id: userId,
      },
      { new: save }
    );

    if (!updatedLogin) {
      return res.status(404).json({ error: "Login not found." });
    }

    res.status(200).json({
      message: "Login updated successfully",
      login: updatedLogin,
    });
  } catch (error) {
    console.error("Error while updating user id: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
