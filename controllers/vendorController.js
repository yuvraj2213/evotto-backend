const Vehicle = require("../models/vehicleCards-model");
const PendingVehicle = require("../models/rental-vehicle-pending-model");
const Order = require("../models/rental-order-model");
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

const getAllVehicles = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vehicles = await Vehicle.find({ vendorId: vendorId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};

const updateVehicleAvailability = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { isAvailable } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { isAvailable },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle availability updated", updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle", error });
  }
};

const totalRevenue = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const today = new Date();

    // Date calculation for the last 7 days, 15 days, and the current month
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);

    const last15Days = new Date(today);
    last15Days.setDate(today.getDate() - 15);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Aggregation for total revenue and different time periods
    const [totalRevenue, monthlyRevenue, last7DaysRevenue, last15DaysRevenue] =
      await Promise.all([
        // Total Revenue (All Time)
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Current Month Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: firstDayOfMonth },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Last 7 Days Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: last7Days },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Last 15 Days Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: last15Days },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),
      ]);

    res.status(200).json({
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
      monthlyRevenue:
        monthlyRevenue.length > 0 ? monthlyRevenue[0].totalRevenue : 0,
      last7DaysRevenue:
        last7DaysRevenue.length > 0 ? last7DaysRevenue[0].totalRevenue : 0,
      last15DaysRevenue:
        last15DaysRevenue.length > 0 ? last15DaysRevenue[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total revenue", error });
  }
};

const addRentalVehicle = async (req, res) => {
  try {
    const { name, description, vehicleNumber, kmRunning } = req.body;

    // Upload the image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "rental_vehicles" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    // Create a new vehicle document
    const newVehicle = new PendingVehicle({
      name,
      description,
      vehicleNumber,
      kmRunning,
      image: result.secure_url,
    });

    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully!" });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
};

module.exports = {
  getAllVehicles,
  updateVehicleAvailability,
  totalRevenue,
  addRentalVehicle,
};
