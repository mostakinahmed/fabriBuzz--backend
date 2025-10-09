const UserData = require("../models/userDataModel");
const multer = require("multer");

//get All user
const getAllUser = async (req, res) => {
  try {
    const user = await UserData.find();
    res.json(user);
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

    // Create new user
    const newUser = new UserData({
      uID: newID,
      fullName,
      admin,
      userName,
      password,
      phone,
      email,
      images,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  createUser,
};
