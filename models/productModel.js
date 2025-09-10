const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pID: {
      type: String,
      trim: true,
      default: "None",
      maxLength: [10, "Product ID cannot exceed 10 characters"],
    },
    name: {
      type: String,
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: String,
    price: {
      type: Number,
      default: 0.0,
    },
    images: String,
    category: String,
  },
  { timestamps: true } //enable createdAt / updatedAt for the schema
);

module.exports = mongoose.model("Product", productSchema);
