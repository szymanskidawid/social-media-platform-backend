const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  user_id: String,
});

module.exports = mongoose.model("logins", loginsSchema);
