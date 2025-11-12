const order = require("../models/orderModel");
const multer = require("multer");

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

// PATCH /orders/:orderId
const orderUpdate = async (req, res) => {
  try {
    const { oID } = req.params;
    const updates = req.body; // frontend sends only changed fields

    // Fetch the order
    const orderData = await order.findOne({ order_id: oID });
    if (!orderData) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update payment status if provided
    if (updates.payment && updates.payment.status) {
      orderData.payment.status = updates.payment.status;
    }

    // Update order status if provided
    if (updates.status) {
      orderData.status = updates.status;
    }

    // Update item SKU(s) if provided
    if (updates.items && Array.isArray(updates.items)) {
      updates.items.forEach((itemUpdate) => {
        const item = orderData.items.find(
          (i) => i.product_id === itemUpdate.product_id
        );
        if (item && itemUpdate.skuID !== undefined) {
          item.skuID = itemUpdate.skuID;
        }
      });
    }

    await orderData.save();

    res.status(200).json({ message: "Order updated", orderData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  orderStatusChanged,
  orderUpdate,
};
