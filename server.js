const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    // 'http://localhost:5173',
    'https://www.evotto.in',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/form/", feedbackRoute);
app.use("/api/data/", rentalVehicleRoute);
app.use("/api/data/", secondHandCarRoute);
app.use("/api/data/", slideshowRoute);
app.use("/api/data/", vehicleRoute);
app.use("/api/data/", rentalLocationRoute);

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
