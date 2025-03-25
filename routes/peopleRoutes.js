const express = require("express");
const People = require("../models/peopleModel");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await People.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Cannot fetch people: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  const {
    loginId,
    name,
    surname,
    town,
    school,
    work,
    background_photo = "",
    profile_photo,
  } = req.body;

  if (!name || !surname) {
    res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(loginId);

    const person = new People({
      login_id: objectId,
      name,
      surname,
      full_name: name + " " + surname,
      town,
      school,
      work,
      background_photo,
      profile_photo,
      friends: [],
      posts: [],
      chats: [],
    });

    const savedPerson = await person.save();

    res.status(201).json(savedPerson);
  } catch (error) {
    console.error("Error while creating a new person: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add-photo", async (req, res) => {});

router.post("/add-friend", async (req, res) => {});

router.put("/update/:id", async (req, res) => {});

module.exports = router;
