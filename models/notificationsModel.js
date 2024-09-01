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

export const Notifications = mongoose.model(
  "notiications",
  notificationsSchema
);
