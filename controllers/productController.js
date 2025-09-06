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

const data = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 2999,
    images: "https://example.com/images/headphones.jpg",
    category: "Electronics",
  },
  {
    name: "Smart Watch",
    description: "Water-resistant smart watch with health tracking features.",
    price: 4999,
    images: "https://example.com/images/smartwatch.jpg",
    category: "Electronics",
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 799,
    images: "https://example.com/images/wallet.jpg",
    category: "Accessories",
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes suitable for daily workouts.",
    price: 2599,
    images: "https://example.com/images/shoes.jpg",
    category: "Footwear",
  },
  {
    name: "Coffee Mug",
    description: "Ceramic coffee mug with ergonomic handle.",
    price: 299,
    images: "https://example.com/images/mug.jpg",
    category: "Kitchenware",
  },
];

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
