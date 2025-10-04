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
    // Validate required fields
    const { catID, catName, specifications } = req.body;

    if (!catID || !catName) {
      return res.status(400).json({
        success: false,
        message: "catID and catName are required.",
      });
    }

    // Check for duplicate category ID
    const existingCategory = await category.findOne({ catID });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: `Category with ID '${catID}' already exists.`,
      });
    }

    // Create and save new category
    const newCategory = new category({
      catID,
      catName,
      specifications: specifications || [],
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating category.",
      error: error.message,
    });
  }
};

//Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCat = await category.findByIdAndDelete(id);

    if (!deletedCat)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllCategories, createCategory, deleteCategory };
