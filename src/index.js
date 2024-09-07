const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
dotenv.config();
app.use(cors());
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const protectedRoute = require("../routes/protectedRoute");
const Bschroute = require("../routes/Bschroute");
const multer = require("multer");

app.use(express.static("views"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", Bschroute); /* 
app.use("/protected", protectedRoute); */

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}.jpg`); //-${file.filename}
//   },
// });
// const upload = multer({ storage });

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/auth/register", (req, res) => {
  res.render("register");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/bookcover", (req, res) => {
  res.render("BookCover");
});
app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.render("login");
});
app.get("/books", (req, res) => {
  try {
    res.status(200).json({ message: "Books retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// app.post("/upload", upload.single("BookCover"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);

//   return res.json({ filepath: `/uploads/${req.file.filename}` });
// });

// app.post("/books", upload.single("BookCover"), (req, res) => {
//   const { Title, description, price, Quantity } = req.body;
//   const BookCover = req.file ? `/uploads/${req.file.filename}` : "";
// });

const username = encodeURIComponent(process.env.Mongo_user);
const password = encodeURIComponent(process.env.Mongo_pass);
const uri = `mongodb+srv://${username}:${password}@cluster0.raql9pz.mongodb.net/`;

mongoose.connect(uri, { dbName: "Book_Data" }).catch((err) => {
  console.log(`ERROR :${err}`);
});

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
