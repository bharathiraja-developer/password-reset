const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  passwordHash: String,
});

module.exports = mongoose.model("user", userSchema, "users");
