const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    // required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    //  required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },

  images: {
    type: String,
    //  required: true,
  },

  category: {
    type: String,
    // required: [true, "Please enter product category"],
  },
});

module.exports = mongoose.model("Product", productSchema);
