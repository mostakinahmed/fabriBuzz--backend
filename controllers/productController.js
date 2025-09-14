const product = require("../models/productModel");
const multer = require("multer");

//get
const getAllProducts = async (req, res) => {
  try {
    const filter = {};

    // Check if category param exists
    if (req.query.category) {
      filter.category = req.query.category; // e.g. "C005"
    }

    const products = await product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert into MongoDB

// CREATE new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new product(req.body); // Data from request

    //id genararte
    const lastProduct = await product.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastProduct && lastProduct.pID) {
      newNumber = parseInt(lastProduct.pID.slice(1)) + 1;
    }
    const newID = "P" + String(newNumber).padStart(6, "0");
    newProduct.pID = newID;
    console.log(newProduct);

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update stock
// PATCH /api/product/:id/stock
const stockUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const updated = await product.findOneAndUpdate(
      { pID: id },
      { stock: stock },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update product
// api/product/update/:id
const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await product.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  stockUpdate,
  deleteProduct,
  productUpdate,
};
