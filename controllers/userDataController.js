require("dotenv").config();
const UserData = require("../models/userDataModel");
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

// Create new user
const createUser = async (req, res) => {
  try {
    const { fullName, admin, userName, password, phone, email, images } =
      req.body;

    // Generate new uID
    const lastUser = await UserData.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastUser && lastUser.uID) {
      newNumber = parseInt(lastUser.uID.slice(1)) + 1;
    }
    const newID = "U" + String(newNumber).padStart(5, "0");

    // 🔒 Hash the password (important!)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
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

    // Save user
    const savedUser = await newUser.save();

    // Hide password before sending to frontend
    const userToSend = savedUser.toObject();
    delete userToSend.password;

    //create token
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(token);

    res.status(201).json({
      message: "User created successfully",
      user: userToSend,
      token,
    });
  } catch (error) {
    console.error(" Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  createUser,
};
