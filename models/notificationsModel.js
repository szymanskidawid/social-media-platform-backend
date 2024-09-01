const mongoose = require("mongoose");

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

module.exports = mongoose.model("notiications", notificationsSchema);
