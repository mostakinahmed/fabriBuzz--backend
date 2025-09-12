require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
//dotenv.config();
//models
const Product = require("./models/productModel");
const category = require("./models/categoryModel");

//routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

//database connection
const db = require("./config/db-connection");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//all api routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/delete", deleteRoutes);

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Fabribuzz App Backend.....");
});

//listening port
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}...`);
});
