const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
  ],
  accessToken: {
    type: String,
  },
  RefreshToken: {
    type: String,
  },
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
