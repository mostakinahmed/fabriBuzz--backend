const express = require("express");
const { getAllStock, createStock,addStock } = require("../controllers/stockController");

const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/", getAllStock);
router.post("/create-stock", createStock);
router.post("/add-stock", addStock);

module.exports = router;
