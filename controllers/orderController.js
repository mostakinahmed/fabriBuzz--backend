const order = require("../models/orderModel");
const multer = require("multer");

//get
const getAllOrder = async (req, res) => {
  try {
    const filter = {};

    // Check if category param exists
    if (req.query.OID) {
      filter.OID = req.query.OID; // e.g. "OID000000005"
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

    //id genararte
    // const lastOrder = await order.findOne().sort({ createdAt: -1 });
    // let newNumber = 1;
    // if (lastOrder && lastOrder.OID) {
    //   newNumber = parseInt(lastOrder.OID.slice(3)) + 1;
    // }
    // const newID = "OID" + String(newNumber).padStart(8, "0");
    // newOrder.OID = newID;
    // console.log(newOrder);

    const savedProduct = await newOrder.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update stock
// PATCH /api/product/:id/stock
// const orderUpdate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { stock } = req.body;

//     const updated = await product.findOneAndUpdate(
//       { pID: id },
//       { stock: stock },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Product not found" });

//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  createOrder,
   getAllOrder,
  // orderUpdate,
};
