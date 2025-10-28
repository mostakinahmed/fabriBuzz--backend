const mongoose = require("mongoose");

const adminDataSchema = new mongoose.Schema(
  {
    adminID: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    status: { type: Boolean, default: true },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    images: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminData", adminDataSchema);
