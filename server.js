const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoute");
const vendorRoute = require("./routes/vendorRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const rentalVehicleRoute = require("./routes/rentalVehicleRoutes");
const secondHandCarRoute = require("./routes/secondHandCarRoutes");
const slideshowRoute = require("./routes/slideshowRoutes");
const errorMiddleware = require("./middlewares/error-mw");
const vehicleRoute = require("./routes/vehicleRoutes");
const servicingRoute = require("./routes/servicingRoutes");
const rentalLocationRoute = require("./routes/rentalLocationRoutes");
const servicingFormRoutes = require("./routes/servicingFormRoutes");
const driverFormRoutes = require("./routes/driverFormRoutes");
const blogRoute = require("./routes/blogRoutes");
const driverRoutes = require("./routes/driverRoutes");
const driverOrderRoutes = require("./routes/driverOrderRoutes");
const couponRoutes=require("./routes/couponRoutes")
const orderRoute=require("./routes/orderRoutes")
const quizRoute=require("./routes/quizRoutes")

const documentRoute=require("./routes/documentRoutes")

// Load environment variables
dotenv.config();
// const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS configuration
const corsOptions = {
  // origin: "https://www.evotto.in",
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); 


// API Routes
app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);
app.use("/api/form/", feedbackRoute);
app.use("/api/data/", rentalVehicleRoute);
app.use("/api/servicing/", servicingRoute);
app.use("/api/data/", slideshowRoute);
app.use("/api/data/", vehicleRoute);
app.use("/api/data/", rentalLocationRoute);
app.use("/api/data/", servicingFormRoutes);
app.use("/api/data/", driverFormRoutes);
app.use("/api/data/", blogRoute);
app.use("/api/data/", driverRoutes);

app.use("/api/data/", driverOrderRoutes);

// Coupon Routes
app.use("/api/data",couponRoutes);

app.use("/api/doc/",documentRoute)

// Admin Routes
app.use("/api/admin", adminRoute);

// Vendor Routes
app.use("/api/vendor", vendorRoute);

// Order Routes
app.use("/api/orders",orderRoute);

// Quiz Route
app.use("/api/quiz",quizRoute);

app.use("/api/cars/", secondHandCarRoute);



app.post("/api/send-invoice", upload.single("invoicePdf"), async (req, res) => {
  const { toEmail, subject, text, station } = JSON.parse(req.body.emailDetails);
  const invoicePdf = req.file ? req.file.buffer : null;

  if (!invoicePdf) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 465 for SSL, 587 for TLS
      secure: false, // Set true for port 465
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    

    // Email to user
    const userMailOptions = {
      from: process.env.EMAIL,
      to: toEmail,
      subject: `Your Invoice - ${subject}`,
      text: `Dear Customer,\n\nYour booking is confirmed with Evotto.\n\nPickUp Station: \n${station}\n\n${text}\n\nBest regards,\nEvotto`,
      attachments: [
        {
          filename: "Invoice.pdf",
          content: invoicePdf,
        },
      ],
    };

    // Email to yourself
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Invoice Sent - ${subject}`,
      text: `An invoice has been sent to ${toEmail}.\n\nMessage: ${text}\n\nAttached is the same invoice.`,
      attachments: [
        {
          filename: "Invoice.pdf",
          content: invoicePdf,
        },
      ],
    };

    // Send both emails asynchronously
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log("Emails sent successfully to user and admin.");
    res.status(200).send("Emails sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails");
  }
});


// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Evotto Backend");
});

app.use(errorMiddleware);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
