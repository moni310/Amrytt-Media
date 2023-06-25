const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: false },
  name: { type: String, required: true },
  email: { unique: true, type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, min: 6, max: 12 },
  haveDeleteRights: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
