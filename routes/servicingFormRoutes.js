const express = require("express");
const {
  servicingFormController,
} = require("../controllers/servicingFormController");

const multer = require("multer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const storage = multer.memoryStorage();
const uploadImg = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

router.post(
  "/servicingForm",
  uploadImg.single("vehicleImage"),
  servicingFormController
);

module.exports = router;
