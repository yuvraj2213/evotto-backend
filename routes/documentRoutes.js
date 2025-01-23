const express = require("express");

const {uploadDriverLicense}=require("../controllers/documentController")

const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth-middleware");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for direct upload
const storage = multer.memoryStorage();
const uploadImg = multer({ storage });

const router = express.Router();

// Route to upload driver's license
router.post("/upload-dl",authMiddleware, uploadImg.single("image"), uploadDriverLicense);

module.exports = router;
