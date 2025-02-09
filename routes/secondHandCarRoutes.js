const express = require("express");
const { uploadCarDetails, getAllVehicles } = require("../controllers/secondHandCarsController");
const multer = require("multer");

const storage = multer.memoryStorage();
const uploadImg = multer({ storage });

const router = express.Router();

router.post("/sell", uploadImg.array("carPhotos", 5), uploadCarDetails);

router.get("/getAllVehicles",getAllVehicles)

module.exports = router;
