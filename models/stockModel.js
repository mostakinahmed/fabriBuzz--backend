const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    sID: {
      type: String,
      required: [true, "Please enter category ID"],
      trim: true,
      unique: true,
      maxLength: [100, "Stock ID cannot exceed 100 characters"],
    },

    pID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    SKU: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr);
        },
        message: "Specifications must be an array of strings",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    versionKey: false, // hides __v field
  }
);

module.exports = mongoose.model("Stock", stockSchema);
