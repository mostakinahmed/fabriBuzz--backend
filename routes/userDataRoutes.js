const express = require("express");
const {
  signUp,
  signIn,
  getAllUser,
} = require("../controllers/userDataController");

const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
