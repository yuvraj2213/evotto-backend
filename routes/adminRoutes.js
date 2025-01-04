const express = require("express");
const upload = require("../controllers/multerConfig.js");
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
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

// User Routes
router.get("/users", authMiddleware, adminMiddleware, userDetails);
router.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
router.delete("/users/delete/:id", authMiddleware, adminMiddleware, deleteUser);
router.patch("/users/update/:id", authMiddleware, adminMiddleware, updateUser);

// Feedback Routes
router.get("/feedbacks", authMiddleware, adminMiddleware, adminFeedbacks);
router.delete(
  "/feedbacks/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminFeedbacksDelete
);
router.get("/feedbacks", authMiddleware, userFeedbacks);

// Slideshow Routes
router.get("/slideshow", authMiddleware, adminMiddleware, showSlideshow);
router.delete(
  "/slideshow/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteSlideshow
);

// Handle OPTIONS request for slideshow upload (Preflight Request)
router.options("/slideshow/upload", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://www.evotto.in");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // No Content
});

// Slideshow Upload Route with Explicit CORS Headers
router.post(
  "/slideshow/upload",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://www.evotto.in");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  },
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadSlideshowImage
);

// Rental Vehicle Routes
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

// Rental Location Routes
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

// Count Routes
router.get("/usersCount", authMiddleware, adminMiddleware, userCount);
router.get("/feedbacksCount", authMiddleware, adminMiddleware, feedbackCount);

module.exports = router;
