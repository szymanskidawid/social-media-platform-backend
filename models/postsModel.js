const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
  time_posted: String,
  post_message: String,
  post_photo: String,
  post_comments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  post_likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "people" },
  ],
});

module.exports = mongoose.model("posts", postsSchema);
