const express = require("express");
const {
  createUser,
  getAllUser,
} = require("../controllers/userDataController");

const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/", getAllUser);
router.post("/register", upload.none(), createUser);

module.exports = router;
