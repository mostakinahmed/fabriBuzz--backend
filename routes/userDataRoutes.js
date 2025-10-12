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
router.post("/signup", upload.none(), signUp);
router.post("/signin", upload.none(), signIn);

module.exports = router;
