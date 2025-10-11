require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

// Models
const Product = require("./models/productModel");
const Category = require("./models/categoryModel");
const Order = require("./models/orderModel");
const UserData = require("./models/userDataModel");

// Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userDataRoutes = require("./routes/userDataRoutes");

// Database connection
const db = require("./config/db-connection");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//cokie
const allowedOrigins = [
  "https://react-auth-jwt.vercel.app",
  "https://leafxbd.vercel.app",
  "https://admin-leapx.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / curl
      if (allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true, // must be true for cookies
  })
);

// API routes (after CORS)
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userDataRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Fabribuzz App Backend.....");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}...`);
});
