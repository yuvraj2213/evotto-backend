const User = require("../models/user-model");
const Feedback = require("../models/feedback-model");
const Slideshow = require("../models/slideshow-model");
const RentalVehicle = require("../models/vehicleCards-model");
const RentalLocation = require("../models/location-model.js");

const userDetails = async (req, res) => {
  try {
    const response = await User.find({}, { password: 0 });

    if (!response) {
      res.status(400).send("Can't fetch the details");
    }

    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};

const userFeedbacks = async (req, res) => {
  try {
    const response = await Feedback.find();

    if (!response) {
      res.status(400).send("Can't fetch the feedbacks");
    }

    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });

    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json({ updatedData });
  } catch (e) {
    console.log(e);
  }
};

const adminFeedbacks = async (req, res) => {
  try {
    const response = await Feedback.find();

    if (!response) {
      res.status(400).send("Can't fetch the feedbacks");
    }

    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};

const adminFeedbacksDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Feedback Deleted Successfully" });
  } catch (e) {
    console.log(e);
  }
};

const showSlideshow = async (req, res) => {
  try {
    const response = await Slideshow.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const deleteSlideshow = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Slideshow.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Image deleted successfully" });
  } catch (e) {
    console.log(e);
  }
};

const uploadSlideshowImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const newImage = new Slideshow({
      url: `${req.protocol}://${req.get('host')}/images/slideshow/${filename}`, // Backend's URL
      altText: req.body.altText || "Slideshow image",
    });

    await newImage.save();

    return res
      .status(201)
      .json({ msg: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ msg: "Failed to upload image" });
  }
};


const rentalVehicle = async (req, res) => {
  try {
    const response = await RentalVehicle.find();

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const rentalVehicleById = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the request parameters
    const response = await RentalVehicle.findById(id); // Find the vehicle by id

    if (!response) {
      return res.status(404).json({ message: "Rental Vehicle not found" });
    }

    return res.status(200).json(response); // Return the found vehicle
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" }); // In case of an error
  }
};

const rentalLocation = async (req, res) => {
  try {
    const response = await RentalLocation.find();

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const addRentalLocation = async (req, res) => {
  try {
    const { name, mapLink } = req.body;

    if (!name || !mapLink) {
      return res
        .status(400)
        .json({ success: false, message: "Name and mapLink are required" });
    }

    const newLocation = new RentalLocation({ name, mapLink });
    await newLocation.save();

    return res.status(201).json({
      success: true,
      message: "Location added successfully",
      location: newLocation,
    });
  } catch (error) {
    console.error("Error adding location:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteRentalLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await RentalLocation.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Location deleted successfully" });
  } catch (e) {
    console.log(e);
  }
};

const userCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user count" });
  }
};

const feedbackCount = async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user count" });
  }
};

const getRentalVehicleById = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle = await RentalVehicle.findOne({ _id: id });

    return res.status(200).json(vehicle);
  } catch (e) {
    console.log(e);
  }
};

const updateRentalVehicleById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const updatedRentalVehicleData = req.body;

    console.log(updatedRentalVehicleData)

    // Update the vehicle and return the updated document
    const updatedVehicle = await RentalVehicle.findByIdAndUpdate(
      id, // Match by ID
      { $set: updatedRentalVehicleData }, // Update data
      { new: true, runValidators: true } // Options to return updated document and run validation
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res
      .status(200)
      .json({ message: "Vehicle updated successfully", updatedVehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  userDetails,
  userFeedbacks,
  deleteUser,
  getUserById,
  updateUser,
  adminFeedbacks,
  adminFeedbacksDelete,
  showSlideshow,
  deleteSlideshow,
  uploadSlideshowImage,
  rentalVehicle,
  rentalLocation,
  addRentalLocation,
  deleteRentalLocation,
  userCount,
  feedbackCount,
  getRentalVehicleById,
  updateRentalVehicleById,
};
