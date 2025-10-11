require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");

//dotenv.config();

//models
const Product = require("./models/productModel");
const category = require("./models/categoryModel");
const order = require("./models/orderModel");
const userData = require("./models/userDataModel");

//routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userDataRoutes = require("./routes/userDataRoutes");

//database connection
const db = require("./config/db-connection");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

//all api routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userDataRoutes);

//allow cookie
app.use(
  cors({
    origin: "https://react-auth-jwt.vercel.app",
    credentials: true, // allow cookies
  })
);

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Fabribuzz App Backend.....");
});

//listening port
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}...`);
});
