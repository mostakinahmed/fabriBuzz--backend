const product = require("../models/productModel");
const multer = require("multer");

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await product.find(); // MongoDB query
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert into MongoDB
// Product.insertMany(products)
//   .then(() => console.log("Products inserted successfully"))
//   .catch((err) => console.error(err));

// CREATE new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new product(req.body); // Data from request
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllProducts, createProduct };
