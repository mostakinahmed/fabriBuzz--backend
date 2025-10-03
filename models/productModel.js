const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pID: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    brandName: { type: String },
    price: { type: Number },
    stock: { type: Number },
    category: { type: String },
    image: { type: String },
    specifications: {
      type: Map,
      of: [{ key: String, value: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
