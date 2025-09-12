const express = require("express");
const { deleteProduct } = require("../controllers/deleteController");

const multer = require("multer");
const upload = multer(); // initialize multer
const router = express.Router();

router.delete("/:id", deleteProduct);

module.exports = router;
