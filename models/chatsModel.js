const mongoose = require("mongoose");

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

module.exports = mongoose.model("chats", chatsSchema);
