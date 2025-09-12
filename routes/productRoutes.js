const express = require("express");
const {
  createProduct,
  getAllProducts,
  stockUpdate,
  deleteProduct,
} = require("../controllers/productController");

const multer = require("multer");
const upload = multer(); // initialize multer
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", upload.none(), createProduct);
router.patch("/:id/stock", stockUpdate); 
router.delete("/delete/:id", deleteProduct);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
