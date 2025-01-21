const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_login: Boolean,
});

module.exports = mongoose.model("logins", loginsSchema);
