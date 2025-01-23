const cloudinary = require("../utils/cloudinary");
const User = require("../models/user-model");

const uploadDriverLicense = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" , folder:"license"}, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          })
          .end(req.file.buffer);
      });
      imageUrl = result.secure_url;
      console.log("Uploaded Image URL:", imageUrl);
    }

    // Assuming you have user authentication and you can get the user from the request (e.g., from a JWT token in headers)
    const userId = req.user._id; // If you're using middleware to extract the user ID from the JWT token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log('ye h url',imageUrl)
    // Update the user's 'dl' field with the uploaded image URL
    user.dl = imageUrl;
    await user.save();

    res.status(200).json({ message: "Driver license uploaded successfully", imageUrl });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred while uploading the driver license" });
  }
};

module.exports = {
  uploadDriverLicense,
};
