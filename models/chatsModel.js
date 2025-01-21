const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  user_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "people" }],
  chat_messages: [
    {
      message_id: String,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "people",
      },
      message: String,
    },
  ],
});

module.exports = mongoose.model("chats", chatsSchema);
