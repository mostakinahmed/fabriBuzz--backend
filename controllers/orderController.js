const order = require("../models/orderModel");
const multer = require("multer");

//get
// const getAllOrder = async (req, res) => {
//   try {
//     const filter = {};

//     // Check if category param exists
//     if (req.query.OID) {
//       filter.OID = req.query.OID; // e.g. "OID000000005"
//     }

//     const orders = await order.find(filter);
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllOrder = async (req, res) => {
  try {
    const filter = {};

    // Check if category param exists
    if (req.query.orderStatus) {
      filter.orderStatus = req.query.orderStatus;
    }

    const orders = await order.find(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert into MongoDB
// CREATE new Order
const createOrder = async (req, res) => {
  try {
    const newOrder = new order(req.body); // Data from request
    const savedProduct = await newOrder.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// PATCH /api/order/status/:id
const orderStatusChanged = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await order.findOneAndUpdate(
      { OID: id },
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  orderStatusChanged,
};
