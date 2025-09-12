const product = require("../models/productModel");
const multer = require("multer");

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

module.exports = {deleteProduct};
