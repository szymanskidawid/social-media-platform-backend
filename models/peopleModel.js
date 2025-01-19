const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  _id: String,
  name: String,
  surname: String,
  full_name: String,
  town: String,
  school: String,
  work: String,
  background_photo: String,
  profile_photo: String,
  photos: [
    {
      id: String,
      url: String,
    },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "people" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "chats" }],
});

module.exports = mongoose.model("people", peopleSchema, "people");
