const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  _id: String,
  post_comments_id: String,
  comments: [
    {
      comment_id: String,
      user_id: String,
      comment: String,
      time_posted: String,
    },
  ],
});

module.exports = mongoose.model("comments", commentsSchema);
