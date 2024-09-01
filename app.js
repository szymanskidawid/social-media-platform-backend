const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

const loginsSchema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  user_id: String,
});

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

const postsSchema = new mongoose.Schema({
  _id: String,
  post_id: String,
  user_id: String,
  time_posted: String,
  post_message: String,
  post_photo: String,
  post_comments_id: String,
  post_likes: [String],
});

const chatsSchema = new mongoose.Schema({
  _id: String,
  chat_id: String,
  user_ids: [String],
  chat_messages: [
    {
      message_id: String,
      user_id: String,
      message: String,
    },
  ],
});

const notificationsSchema = new mongoose.Schema({
  _id: String,
  notified_user_id: String,
  notifications: [
    {
      id: String,
      type: String,
      from: String,
    },
  ],
});

const Logins = mongoose.model("logins", loginsSchema);
const People = mongoose.model("people", peopleSchema);
const Posts = mongoose.model("posts", postsSchema);
const Chats = mongoose.model("chats", chatsSchema);
const Notifications = mongoose.model(
  "notiications",
  notificationsSchema
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
