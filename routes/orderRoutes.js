const express = require("express");
const {
  createOrder,
  getAllOrder,
  // orderUpdate,
} = require("../controllers/orderController");

const multer = require("multer");
const upload = multer(); // initialize multer
const router = express.Router();

router.get("/", getAllOrder);
router.post("/", upload.none(), createOrder);
//router.patch("/:id/stock", orderUpdate);

module.exports = router;
