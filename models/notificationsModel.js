const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  _id: String,
  notified_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "people",
  },
  notifications: [
    {
      id: String,
      type: String,
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "people",
      },
    },
  ],
});

module.exports = mongoose.model("notifications", notificationsSchema);
