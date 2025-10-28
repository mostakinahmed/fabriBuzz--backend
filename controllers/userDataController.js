require("dotenv").config();
const UserData = require("../models/userDataModel");
const AdminData = require("../models/adminDataModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { fullName, admin, userName, password, phone, email, images } =
      req.body;

    // Generate new uID
    const lastUser = await UserData.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastUser && lastUser.uID)
      newNumber = parseInt(lastUser.uID.slice(1)) + 1;
    const newID = "U" + String(newNumber).padStart(5, "0");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new UserData({
      uID: newID,
      fullName,
      admin,
      userName,
      password: hashedPassword,
      phone,
      email,
      images,
    });

    const savedUser = await newUser.save();

    // Hide password before sending to frontend
    const userToSend = savedUser.toObject();
    delete userToSend.password;

    // Create JWT token
    const tokenLast = jwt.sign(
      { email: savedUser.email, id: savedUser.uID },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send cookie
    // const isProduction = process.env.NODE_ENV === "production";

    // res.cookie("token111", tokenLast, {
    //   httpOnly: true, // cannot be accessed by JS
    //   secure: isProduction, // true on HTTPS (Vercel), false on local dev
    //   sameSite: isProduction ? "None" : "Lax", // None for cross-origin in production
    //   path: "/",
    //   maxAge: 2 * 60 * 60 * 1000, // 2 hours
    // });

    // Send response
    res.status(201).json({
      message: "User created successfully",
      user: userToSend,
      tokenLast,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

//Admin Sign Up controller for - react Admin panel
const adminSignUp = async (req, res) => {
  try {
    const { fullName, role, status, userName, password, phone, email, images } =
      req.body;

    // Generate new aID
    const lastUser = await AdminData.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastUser && lastUser.adminID)
      newNumber = parseInt(lastUser.adminID.slice(1)) + 1;
    const newID = "A" + String(newNumber).padStart(5, "0");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new AdminData({
      adminID: newID,
      fullName,
      role,
      status,
      userName,
      password: hashedPassword,
      phone,
      email,
      images,
    });

    const savedUser = await newUser.save();
    // console.log("Admin user saved:", savedUser);
    // // Hide password before sending to frontend
    // const userToSend = savedUser.toObject();
    // delete userToSend.password;

    // // Create JWT token
    // const tokenLast = jwt.sign(
    //   { email: savedUser.email, id: savedUser.uID },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "2h" }
    // );

    // Send cookie
    // const isProduction = process.env.NODE_ENV === "production";

    // res.cookie("token111", tokenLast, {
    //   httpOnly: true, // cannot be accessed by JS
    //   secure: isProduction, // true on HTTPS (Vercel), false on local dev
    //   sameSite: isProduction ? "None" : "Lax", // None for cross-origin in production
    //   path: "/",
    //   maxAge: 2 * 60 * 60 * 1000, // 2 hours
    // });

    // Send response
    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};
// Get all Admins
const adminList = async (req, res) => {
  try {
    const users = await AdminData.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sign In controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Match password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    //Create JWT token
    const token = jwt.sign(
      { email: user.email, id: user.uID },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send successful response
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkAuth = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  //if token available
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //fetch user data
    // Fetch user data from DB
    const userInfo = await UserData.findOne({
      uID: decoded.id, // or uID: decoded.id if you used uID
    }).select("-password"); // hide password

    res.json({ loggedIn: true, user: userInfo });
  } catch (err) {
    res
      .status(403)
      .json({ loggedIn: false, message: "Invalid or expired token" });
  }
};

module.exports = {
  getAllUser,
  signUp,
  signIn,
  checkAuth,
  adminSignUp,
  adminList,
};
