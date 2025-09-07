const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catID: {
    type: String,
    required: [true, "Please enter category ID"],
    trim: true,
    maxLength: [100, "Category ID cannot exceed 100 characters"],
  },

  catName: {
    type: String,
    required: [true, "Please enter category name"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
