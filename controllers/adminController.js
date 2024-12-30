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
      url: `/images/Slideshow/${filename}`,
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

    return res
      .status(201)
      .json({
        success: true,
        message: "Location added successfully",
        location: newLocation,
      });
  } catch (error) {
    console.error("Error adding location:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
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
};
