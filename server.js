const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const rentalVehicleRoute = require("./routes/rentalVehicleRoutes");
const secondHandCarRoute = require("./routes/secondHandCarRoutes");
const slideshowRoute = require("./routes/slideshowRoutes");
const errorMiddleware = require("./middlewares/error-mw");
const vehicleRoute = require("./routes/vehicleRoutes");
const rentalLocationRoute = require("./routes/rentalLocationRoutes");
const servicingFormRoutes=require("./routes/servicingFormRoutes")

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    // 'https://www.evotto.in',
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/images", express.static(path.join(__dirname, "/tmp")));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/form/", feedbackRoute);
app.use("/api/data/", rentalVehicleRoute);
app.use("/api/data/", secondHandCarRoute);
app.use("/api/data/", slideshowRoute);
app.use("/api/data/", vehicleRoute);
app.use("/api/data/", rentalLocationRoute);

app.use("/api/data/", servicingFormRoutes);

const uploadDir = path.join(__dirname, "uploads");
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

const upload = multer({ storage });

// Import your Slideshow model
const Slideshow = require("./models/slideshow-model");

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Save metadata to the Slideshow collection
    const newImage = new Slideshow({
      url: `/uploads/${req.file.filename}`, // URL for accessing the uploaded file
      altText: req.body.altText || "Slideshow Image", // Optional altText field
    });

    await newImage.save(); // Save to the database

    res.status(200).send({
      message: "Image uploaded and saved to database successfully!",
      image: {
        url: newImage.url,
        altText: newImage.altText,
      },
    });
  } catch (error) {
    console.error("Error uploading file or saving to database:", error);
    res.status(500).send("Server error");
  }
});

app.get("/api/images", async (req, res) => {
  try {
    const images = await Slideshow.find();
    const imageList = images.map((image) => ({
      url: `http://localhost:2213${image.url}`, // Full URL to access the image
      altText: image.altText,
    }));
    res.status(200).json(imageList);
  } catch (error) {
    console.error("Error in /api/images:", error);
    res.status(500).send("Server error");
  }
});





app.use("/uploads", express.static(uploadDir));


// Admin Routes
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Evotto Backend");
});

app.use(errorMiddleware);

// Connect to database and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
