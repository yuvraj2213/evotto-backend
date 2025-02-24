const Servicing = require("../models/servicing-model");
const User = require("../models/user-model");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const storage = multer.memoryStorage();
const uploadImg = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createServicing = async (req, res) => {
  try {
    const {
      vehicleType,
      vehicleName,
      serviceType,
      requirements,
      date,
      time,
      userEmail,
      user,
    } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let vehicleImageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "vehicle_images" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      vehicleImageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "Vehicle image is required" });
    }

    const newServicing = new Servicing({
      vehicleType,
      vehicleName,
      vehicleImage: vehicleImageUrl,
      serviceType,
      requirements,
      date,
      time,
      userEmail,
      user,
    });

    await newServicing.save();
    res.status(201).json({
      message: "Servicing appointment created successfully",
      newServicing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getAllServicing = async (req, res) => {
  try {
    const appointments = await Servicing.find().populate("user", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
