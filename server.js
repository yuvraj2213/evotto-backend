const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const rentalVehicleRoute = require("./routes/rentalVehicleRoutes");
const secondHandCarRoute = require("./routes/secondHandCarRoutes");
const slideshowRoute = require("./routes/slideshowRoutes");
const vehicleRoute = require("./routes/vehicleRoutes");
const rentalLocationRoute = require("./routes/rentalLocationRoutes");
const errorMiddleware = require("./middlewares/error-mw");

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    "https://www.evotto.in", // Make sure to allow the specific domain you're sending requests from
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS to handle preflight requests
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Allow required headers
  credentials: true, // Allow cookies if needed for authentication
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS for the upload route
app.options("/api/admin/slideshow/upload", cors(corsOptions)); // Manually handle OPTIONS for the upload route

// Middleware for parsing JSON
app.use(express.json());

// Route Definitions
app.use("/api/auth", authRoute);
app.use("/api/form", feedbackRoute);
app.use("/api/data", rentalVehicleRoute);
app.use("/api/data", secondHandCarRoute);
app.use("/api/data", slideshowRoute);
app.use("/api/data", vehicleRoute);
app.use("/api/data", rentalLocationRoute);
app.use("/api/admin", adminRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Evotto Backend");
});

// Error Handling Middleware
app.use(errorMiddleware);

// Serve Static Files (Optional, for frontend assets)
app.use(express.static(path.join(__dirname, "../frontend/build"))); // Uncomment this if serving frontend files

// Connect to the Database and Start Server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 2213;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit the application if the database connection fails
  });
