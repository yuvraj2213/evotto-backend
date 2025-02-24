const express = require("express");
const multer = require("multer");
const { createServicing, getAllServicing } = require("../controllers/servicingController");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/create", upload.single("vehicleImage"), createServicing);
router.get("/getOrders", getAllServicing);

module.exports = router;
