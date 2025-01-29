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
const feedbackRoute = require("./routes/feedbackRoutes");
const rentalVehicleRoute = require("./routes/rentalVehicleRoutes");
const secondHandCarRoute = require("./routes/secondHandCarRoutes");
const slideshowRoute = require("./routes/slideshowRoutes");
const errorMiddleware = require("./middlewares/error-mw");
const vehicleRoute = require("./routes/vehicleRoutes");
const rentalLocationRoute = require("./routes/rentalLocationRoutes");
const servicingFormRoutes = require("./routes/servicingFormRoutes");
const driverFormRoutes = require("./routes/driverFormRoutes");
const blogRoute = require("./routes/blogRoutes");
const driverRoutes = require("./routes/driverRoutes");
const driverOrderRoutes = require("./routes/driverOrderRoutes");

const documentRoute=require("./routes/documentRoutes")

// Load environment variables
dotenv.config();
const app = express();

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
  origin: "https://www.evotto.in",
  // origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); 

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file buffer to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${file.buffer.toString("base64")}`,
      { folder: "uploads" }
    );

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/form/", feedbackRoute);
app.use("/api/data/", rentalVehicleRoute);
app.use("/api/data/", secondHandCarRoute);
app.use("/api/data/", slideshowRoute);
app.use("/api/data/", vehicleRoute);
app.use("/api/data/", rentalLocationRoute);
app.use("/api/data/", servicingFormRoutes);
app.use("/api/data/", driverFormRoutes);
app.use("/api/data/", blogRoute);
app.use("/api/data/", driverRoutes);

app.use("/api/data/", driverOrderRoutes);

app.use("/api/doc/",documentRoute)

// Admin Routes
app.use("/api/admin", adminRoute);

app.post("/api/send-invoice", upload.single("invoicePdf"), async (req, res) => {
  const { toEmail, subject, text } = JSON.parse(req.body.emailDetails);
  const invoicePdf = req.file ? req.file.buffer : null; 
  console.log(text,subject)

  if (!invoicePdf) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: process.env.EMAIL,
      subject,
      text,
      attachments: [
        {
          filename: "Invoice.pdf",
          content: invoicePdf, // Directly use the buffer from the uploaded file
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
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
