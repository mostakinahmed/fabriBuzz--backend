const express = require("express");
const {
  createProduct,
  getAllProducts,
  stockUpdate,
  deleteProduct,
  productUpdate,
} = require("../controllers/productController");

const multer = require("multer");
const upload = multer(); // initialize multer
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", upload.none(), createProduct);
router.patch("/:id/stock", stockUpdate); 
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", productUpdate);

module.exports = router;
