const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    uID: { type: String, required: true, unique: true },
    admin: { type: Boolean, default: false },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    images: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", userDataSchema);
