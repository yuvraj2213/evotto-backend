const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

const storage = multer.memoryStorage();
const uploadImg = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "vehicle_images", public_id: file.originalname },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw error;
        }
        return result;
      }
    );

    // Stream the image buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream(result);
    stream.end(file.buffer); // Upload the image from memory
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Servicing form controller with image upload
const servicingFormController = async (req, res) => {
  try {
    const { vehicleType, vehicleName, serviceType, requirements, date, time } =
      req.body;
    const userEmail = req.body.userEmail || "user@example.com";
    const vehicleImage = req.file; // Vehicle image uploaded as buffer

    if (!vehicleImage) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(vehicleImage);

    // Compose email to admin with Cloudinary URL
    const mailToAdmin = {
      from: "your-email@gmail.com",
      to: "evotto.service@gmail.com",
      subject: "New Servicing Appointment",
      html: `
        <h3>New Servicing Appointment</h3>
        <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
        <p><strong>Vehicle Name:</strong> ${vehicleName}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Requirements:</strong> ${requirements}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Vehicle Image:</strong> <a href="${uploadedImage.url}">${uploadedImage.url}</a></p>
      `,
    };

    // Compose confirmation email for the user
    const mailToUser = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Appointment Confirmation",
      html: `
        <h3>Appointment Confirmed</h3>
        <p>Thank you for booking a servicing appointment with us!</p>
        <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
    };

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res
      .status(200)
      .json({ message: "Form submitted and emails sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

module.exports = {
  servicingFormController,
  uploadImg,
};
