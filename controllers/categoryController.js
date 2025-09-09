const category = require("../models/categoryModel");
const multer = require("multer");

// GET all categories
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await category.find(); // MongoDB query
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllCategories = async (req, res) => {
  try {
    const filter = {};

    // If query param exists, filter by catID
    if (req.query.catID) {
      filter.catID = req.query.catID; // e.g., "C001"
    }

    const categories = await category.find(filter);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new category(req.body); // Data from request
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCategories, createCategory };
