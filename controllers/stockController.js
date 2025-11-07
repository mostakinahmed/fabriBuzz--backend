const stock = require("../models/stockModel");
const multer = require("multer");

const getAllStock = async (req, res) => {
  try {
    const stocks = await stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new category
const createStock = async (req, res) => {
  try {
    // Validate required fields
    const { sID, pID, SKU } = req.body;

    // Create and save new category
    const newStock = new stock({
      sID,
      pID,
      SKU: SKU || [],
    });

    const savedStock = await newStock.save();

    res.status(201).json({
      success: true,
      message: "Stock created successfully.",
      data: savedStock,
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
// const deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCat = await category.findByIdAndDelete(id);

//     if (!deletedCat)
//       return res.status(404).json({ message: "Product not found" });

//     res.status(200).json(deletedCat);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

module.exports = { getAllStock, createStock };
