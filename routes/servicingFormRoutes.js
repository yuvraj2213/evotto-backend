const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  servicingFormController,
} = require("../controllers/servicingFormController");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for form submission
router.post(
  "/servicingForm",
  upload.single("vehicleImage"),
  servicingFormController
);

module.exports = router;
