const mongoose = require("mongoose");
const { Schema } = mongoose;

const users = new Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },

  userName: { type: String, required: false },
});

module.exports = mongoose.model("user", users);
