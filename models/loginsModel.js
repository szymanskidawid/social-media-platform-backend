const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  user_id: String,
});

export const Logins = mongoose.model("logins", loginsSchema);
