const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the path where files should be stored
    const uploadPath = path.resolve(
      __dirname,
      "../../frontend/public/images/Slideshow"
    );

    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Pass the upload path to the callback
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filter to validate uploaded files
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false); // Reject the file
  }
};

// Initialize and export Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

module.exports = upload;
