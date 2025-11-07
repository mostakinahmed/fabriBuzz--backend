const express = require("express");
const {
  getAllStock,
  createStock,
} = require("../controllers/stockController");

const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/", getAllStock);
router.post("/create-stock", createStock);
// router.post("/update-stock", updateStock);

module.exports = router;
