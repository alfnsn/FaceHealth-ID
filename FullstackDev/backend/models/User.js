const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true, 
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);