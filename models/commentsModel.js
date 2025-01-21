const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  comments: [
    {
      comment_id: String,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "people",
      },
      comment: String,
      time_posted: String,
    },
  ],
});

module.exports = mongoose.model("comments", commentsSchema);
