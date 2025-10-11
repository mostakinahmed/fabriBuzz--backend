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

//allow cookie
//const cors = require("cors");

const allowedOrigins = [
  "https://leafxbd.vercel.app", // local frontend (public site)
  "https://react-auth-jwt.vercel.app", // deployed public site
  "https://admin-leapx.vercel.app", // deployed admin panel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ origin allowed
      } else {
        callback(new Error("Not allowed by CORS"), false); // ❌ origin blocked
      }
    },
    credentials: true, // ✅ allow cookies
  })
);

//all api routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userDataRoutes);

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Fabribuzz App Backend.....");
});

//listening port
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}...`);
});
