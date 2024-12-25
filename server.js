const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors")

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const rentalVehicleRoute=require("./routes/rentalVehicleRoutes")
const secondHandCarRoute=require("./routes/secondHandCarRoutes")
const errorMiddleware = require("./middlewares/error-mw");

dotenv.config();
const app = express();

const corsOptions={
  origin:"http://evotto.vercel.app",
  methods:"GET,POST,PUT,PATCH,DELETE",
  credentials:true
}

app.use(cors(corsOptions))


app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/form/", feedbackRoute);
app.use("/api/data/",rentalVehicleRoute)
app.use("/api/data/",secondHandCarRoute)

// Admin Routes
app.use("/api/admin",adminRoute);


app.get("/", (req, res) => {
  res.send("Welcome to Evotto Backend");
});

app.use(errorMiddleware)

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
