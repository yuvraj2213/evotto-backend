const express = require("express");
const path = require("path");
const multer = require("multer");
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
  updateRentalVehicleById
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer to save files to the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Generate unique file name
    cb(null, uniqueName);
  },
});

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

router.get('/rentalVehicle',authMiddleware,adminMiddleware,rentalVehicle)
router.get('/rentalVehicle/:id',authMiddleware,adminMiddleware,getRentalVehicleById)
router.patch('/rentalVehicle/:id/update',authMiddleware,adminMiddleware,updateRentalVehicleById)



router.get('/rentalLocation',authMiddleware,adminMiddleware,rentalLocation)
router.post('/addRentalLocation',authMiddleware,adminMiddleware,addRentalLocation)
router.delete('/rentalLocation/delete/:id',authMiddleware,adminMiddleware,deleteRentalLocation)

// Counts
router.get("/usersCount", authMiddleware, adminMiddleware, userCount);
router.get("/feedbacksCount", authMiddleware, adminMiddleware,feedbackCount);


module.exports = router;
