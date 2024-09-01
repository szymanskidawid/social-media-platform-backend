const mongoose = require("mongoose");

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

export const Posts = mongoose.model("posts", postsSchema);
