const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brandName: { type: String },
    price: {
      cost: { type: Number, default: 0 },
      selling: { type: Number, required: true },
      discount: { type: Number, default: 0 },
    },
    stock: { type: String },
    category: { type: String },
    images: [{ type: String }],
    description: { type: String },
    status: {
      isFeatured: { type: Boolean, default: false },
      isFlashSale: { type: Boolean, default: false },
      isBestSelling: { type: Boolean, default: false },
      isNewArrival: { type: Boolean, default: false },
    },
    specifications: {
      type: Map,
      of: [{ key: String, value: String, _id: false }], // prevent _id in subdocs
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
