const express = require("express");
const {getAllVehicles, totalRevenue, updateVehicleAvailability, updateRentalVehicleById} = require('../controllers/vendorController');
const { addRentalVehicle } = require("../controllers/vendorController");
const multer = require("multer");
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

router.get('/getAllVehicles/:vendorId',getAllVehicles)

router.patch("/updateVehicle/:vehicleId", updateVehicleAvailability);

router.get('/totalRevenue/:vendorId',totalRevenue)

router.post('/addRentalVehicle',uploadImg.single("image"),addRentalVehicle)

router.patch(
  "/rentalVehicle/:id/update",
  updateRentalVehicleById
);

module.exports=router;