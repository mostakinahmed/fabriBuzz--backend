const express = require("express");
const {
  signUp,
  checkAuth,
  signIn,
  getAllUser,
  adminSignUp,
  adminList,
} = require("../controllers/userDataController");

const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/check-auth", checkAuth);

// Admin routes can be added here in the future
router.post("/admin/signup", adminSignUp);
router.get("/admin/list", adminList);

module.exports = router;
