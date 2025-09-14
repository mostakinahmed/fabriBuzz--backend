const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // order info
    OID: {
      type: String,
      trim: true,
      maxLength: [15, "Order ID cannot exceed 10 characters"],
    },
    customerName: {
      type: String,
      trim: true,
    },

    customerEmail: {
      type: String,
      trim: true,
    },

    customerPhone: {
      type: String,
      trim: true,
    },
    // orderDate: {
    //   type: String,
    //   trim: true,
    //   maxLength: [100, "Product name cannot exceed 100 characters"],
    // },
    shippingAddress: String,
    paymentMethod: String,

    //product info
    pID: {
      type: String,
      trim: true,
    },
    productObjectID: {
      type: String,
      trim: true,
    },
    productName: {
      type: String,
      trim: true,
    },
    productPrice: {
      type: String,
      trim: true,
    },

    productQuantity: {
      type: String,
      trim: true,
    },

    totalPrice: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      default: 0.0,
    },

    images: String,
    category: String,
  },
  { timestamps: true } //enable createdAt / updatedAt for the schema
);

module.exports = mongoose.model("Order", orderSchema);
