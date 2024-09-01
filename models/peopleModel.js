const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  _id: String,
  user_id: String,
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
  friends: [String],
  posts: [String],
  chats: { String },
});

export const People = mongoose.model("people", peopleSchema);
