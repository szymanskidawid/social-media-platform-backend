const express = require("express");
const People = require("../models/peopleModel");

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
    name,
    surname,
    town = "",
    school = "",
    work = "",
    background_photo = "",
    profile_photo = "",
  } = req.body;

  if (!name || !surname) {
    res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const person = new People({
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

router.post("/add-photo", async (req, res) => {
  const { userId, photo } = req.body;

  try {
    const user = await People.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.photos.push(photo);
    await user.save();

    res.status(200).json({ message: "Photo added successfully" });
  } catch (error) {
    console.error("Error in photo upload: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add-friend", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const [user, friend] = await Promise.all([
      People.findById(userId),
      People.findById(friendId),
    ]);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ error: "User is already a friend" });
    }

    user.friends.push(friendId);
    await user.save();

    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
      await friend.save();
    }

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error while adding a friend: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  const {
    name,
    surname,
    town,
    school,
    work,
    background_photo,
    profile_photo,
  } = req.body;

  try {
    const updatedUser = People.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        surname: surname,
        town: town,
        school: school,
        work: work,
        background_photo: background_photo,
        profile_photo: profile_photo,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "User updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error while updating user profile: ", error);
    re.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
