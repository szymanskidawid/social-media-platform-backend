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

export const Comments = mongoose.model("comments", commentsSchema);
