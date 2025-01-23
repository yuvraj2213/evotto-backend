const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // Import cloudinary configuration

// Define storage in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_licenses", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "pdf"], // File formats
  },
});

const upload = multer({ storage });

module.exports = upload;
