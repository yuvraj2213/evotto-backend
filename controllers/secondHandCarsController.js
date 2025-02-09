const Car = require("../models/secondHandCars-model.js");
const cloudinary = require("../utils/cloudinary.js");

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Car.find(); 
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};


const uploadCarDetails = async (req, res) => {
  try {
    const { name, address, phoneNumber, whatsappNumber, carName, condition, conditionDesc, sellingPrice } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      // 🔥 Convert each file upload to a Promise and wait for all uploads
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "car_photos", resource_type: "image" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);  // 🔥 Use file.buffer for Multer memory storage
        });
      });

      imageUrls = await Promise.all(uploadPromises);  // 🔥 Wait for all uploads to finish
    }

    // Save to MongoDB
    const newCar = new Car({
      name,
      address,
      phoneNumber,
      whatsappNumber,
      carName,
      condition,
      conditionDesc,
      carPhotos: imageUrls,  // Store Cloudinary URLs
      sellingPrice,
    });

    await newCar.save();
    res.status(201).json({ message: "Car listed successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getAllVehicles, uploadCarDetails };
