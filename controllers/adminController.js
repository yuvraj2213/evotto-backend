const User = require("../models/user-model");
const Feedback = require("../models/feedback-model");
const Slideshow = require("../models/slideshow-model");
const RentalVehicle = require("../models/vehicleCards-model");
const RentalLocation = require("../models/location-model.js");
const Blog = require("../models/blogs-model.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const images = await Slideshow.find();

    if (!images || images.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    // Dynamically construct base URL
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const imageList = images.map((image) => ({
      id: image._id.toString(), // Make sure the _id is included
      url: image.url, // Cloudinary URLs are already absolute
      altText: image.altText,
    }));

    res.status(200).json(imageList);
  } catch (e) {
    console.error("Error fetching slideshow images:", e);
    res.status(500).json({ msg: "Failed to fetch slideshow images" });
  }
};

const deleteSlideshow = async (req, res) => {
  try {
    const id = req.params.id;

    // Find image by ID
    const image = await Slideshow.findById(id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete image from the database
    await Slideshow.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Image deleted successfully" });
  } catch (e) {
    console.error("Error deleting slideshow image:", e);
    res.status(500).json({ msg: "Failed to delete image" });
  }
};

const uploadSlideshowImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "slideshow" },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      // Pipe the file buffer to Cloudinary
      stream.end(file.buffer);
    });

    // Save the Cloudinary response data in your database
    const newImage = new Slideshow({
      url: result.secure_url, // URL of the uploaded image
      publicId: result.public_id, // Unique public ID of the image
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

    console.log(updatedRentalVehicleData);

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

const addRentalVehicle = async (req, res) => {
  try {
    const { name, sixhrPrice, twelvehrPrice, twentyfourhrPrice, isAvailable } = req.body;

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
    const newVehicle = new RentalVehicle({
      name,
      sixhrPrice,
      twelvehrPrice,
      twentyfourhrPrice,
      isAvailable,
      image: result.secure_url,
    });

    // Save the vehicle to the database
    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully!" });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
};

const deleteRentalVehicleById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await RentalVehicle.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Location deleted successfully" });
  } catch (e) {
    console.log(e);
  }
};

// Blogs

const addBlog = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug the parsed body
    console.log("Uploaded File:", req.file); // Debug the file received

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let imageUrl = "";
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
      console.log("Uploaded Image URL:", imageUrl);
    }

    const blog = new Blog({ title, content, url: imageUrl });
    await blog.save();

    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (error) {
    console.error("Error adding blog:", error); // Log error for debugging
    res.status(500).json({ message: "Error adding blog", error: error.message });
  }
};


// Update a blog
// const updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     const imageUrl = req.file ? req.file.path : null; // New image URL if uploaded

//     const updatedFields = { title, content };
//     if (imageUrl) updatedFields.url = imageUrl;

//     const blog = await Blog.findByIdAndUpdate(id, updatedFields, { new: true });

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.status(200).json({ message: "Blog updated successfully", blog });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating blog", error });
//   }
// };

// // Delete a blog
// const deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const blog = await Blog.findByIdAndDelete(id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.status(200).json({ message: "Blog deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting blog", error });
//   }
// };

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
  addRentalVehicle,
  deleteRentalVehicleById,
  addBlog,
  // deleteBlog,
};
