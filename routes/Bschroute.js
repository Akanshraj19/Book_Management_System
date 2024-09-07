const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const verifyToken = require("../Middleware/authMiddleware.js");
const userController = require("../Controller/userController.js");
const bookController = require("../Controller/bookController.js");

//userRoutes
router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.get("/auth/find", verifyToken, userController.find);
router.put("/auth/update", verifyToken, userController.update);
router.delete("/auth/delete", verifyToken, userController.delete);

//BookRoutes
router.post("/books", bookController.create);
// Read all items
router.get("/books", bookController.read);
// router.get("/getBooks")
//find, update and delete by id
// router.get("/books/:id", verifyToken, bookController.find);
router.get("/fetchbooks", bookController.find);
router.put("/books/:id", verifyToken, bookController.update);
router.delete("/books/:id", verifyToken, bookController.delete);
// router.post("/upload", upload.single("BookCover"), bookController.upload);

module.exports = router;
