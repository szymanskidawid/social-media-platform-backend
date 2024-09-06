const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
  //_id: String,
  email: String,
  password: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
});

module.exports = mongoose.model("logins", loginsSchema);
