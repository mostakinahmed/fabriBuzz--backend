const Product = require("../models/productModel");
const multer = require("multer");

//get
const getAllProducts = async (req, res) => {
  try {
    const filter = {};

    // Check if category param exists
    if (req.query.category) {
      filter.category = req.query.category; // e.g. "C005"
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert into MongoDB

// CREATE new Product
const createProduct = async (req, res) => {
  try {
    const { name, brandName, price, stock, category, images, specifications } =
      req.body;

    console.log(specifications);

    // Generate new pID
    const lastProduct = await Product.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastProduct && lastProduct.pID) {
      newNumber = parseInt(lastProduct.pID.slice(1)) + 1;
    }
    const newID = "P" + String(newNumber).padStart(6, "0");

    // Filter specifications
    const filteredSpecs = {};
    for (const key in specifications) {
      const arr = specifications[key];
      if (Array.isArray(arr) && arr.length > 0) {
        filteredSpecs[key] = arr;
      }
    }

    // Create new product
    const newProduct = new Product({
      pID: newID,
      name,
      brandName,
      price,
      stock,
      category,
      images,
      specifications: filteredSpecs,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update stock
// PATCH /api/Product/:id/stock
const stockUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const updated = await Product.findOneAndUpdate(
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
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update Product
// api/Product/update/:id
const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await Product.findOneAndUpdate({ _id: id }, data, {
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
