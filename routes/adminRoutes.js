const express = require("express");
const fs = require("fs");
const {
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
  pendingVehicles,
  acceptPendingVehicle,
  deletePendingVehicle,
  // getAllBlogs,
  // updateBlog,
  // deleteBlog,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const multer = require("multer");
const path = require("path");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for direct upload
const storage = multer.memoryStorage();
const uploadImg = multer({ storage });

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, userDetails);
router.get("/feedbacks", authMiddleware, userFeedbacks);

router.delete("/users/delete/:id", authMiddleware, adminMiddleware, deleteUser);
router.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
router.patch("/users/update/:id", authMiddleware, adminMiddleware, updateUser);

router.get("/feedbacks", authMiddleware, adminMiddleware, adminFeedbacks);
router.delete(
  "/feedbacks/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminFeedbacksDelete
);

router.get("/slideshow", showSlideshow);
router.delete(
  "/slideshow/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteSlideshow
);
router.post(
  "/slideshow/upload",
  uploadImg.single("image"),
  uploadSlideshowImage
);

router.get("/rentalVehicle", authMiddleware, adminMiddleware, rentalVehicle);
router.get(
  "/rentalVehicle/:id",
  authMiddleware,
  adminMiddleware,
  getRentalVehicleById
);
router.patch(
  "/rentalVehicle/:id/update",
  authMiddleware,
  adminMiddleware,
  updateRentalVehicleById
);
router.post("/addRentalVehicle", uploadImg.single("image"), addRentalVehicle);
router.delete(
  "/deleteRentalVehicle/:id",
  authMiddleware,
  adminMiddleware,
  deleteRentalVehicleById
);

module.exports = router;

router.get("/rentalLocation", authMiddleware, adminMiddleware, rentalLocation);
router.post(
  "/addRentalLocation",
  authMiddleware,
  adminMiddleware,
  addRentalLocation
);
router.delete(
  "/rentalLocation/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteRentalLocation
);

// Counts
router.get("/usersCount", authMiddleware, adminMiddleware, userCount);
router.get("/feedbacksCount", authMiddleware, adminMiddleware, feedbackCount);

// Blogs
router.post(
  "/addBlog",
  authMiddleware,
  adminMiddleware,
  uploadImg.single("image"),
  addBlog
);
// router.put("/update/:id", uploadImg.single("image"), updateBlog);
// router.delete("/delete/:id", deleteBlog);

router.get('/pendingVehicles',authMiddleware,adminMiddleware,pendingVehicles);

router.post('/acceptPendingVehicle',authMiddleware,adminMiddleware,acceptPendingVehicle);
router.delete('/deletePendingVehicle/:id',authMiddleware,adminMiddleware,deletePendingVehicle);


module.exports = router;
