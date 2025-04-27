const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "people",
  },

  notified_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "people",
  },
  type: String,
  time_sent: String,
});

module.exports = mongoose.model("notifications", notificationsSchema);
