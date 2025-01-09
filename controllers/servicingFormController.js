const nodemailer = require("nodemailer");
const path = require("path");

const servicingFormController = async (req, res) => {
  try {

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { vehicleType, vehicleName, serviceType, requirements, date, time } = req.body;
    const userEmail = req.body.userEmail || "user@example.com"; // Assume user email from frontend
    const vehicleImage = req.file;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: "yuvraj13preet@gmail.com", // Replace with your email
        pass: "nzya honn fmiv cxdt", // Replace with your email password or app password
      },
    });

    // Compose email to send to your email
    const mailToAdmin = {
      from: "your-email@gmail.com",
      to: "yuvraj13preet@gmail.com", // Replace with your email
      subject: "New Servicing Appointment",
      html: `
        <h3>New Servicing Appointment</h3>
        <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
        <p><strong>Vehicle Name:</strong> ${vehicleName}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Requirements:</strong> ${requirements}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
      attachments: [
        {
          filename: vehicleImage.originalname,
          path: vehicleImage.path,
        },
      ],
    };

    // Compose confirmation email for the user
    const mailToUser = {
      from: "yuvraj13preet@gmail.com",
      to: userEmail, // User's email
      subject: "Appointment Confirmation",
      html: `
        <h3>Appointment Confirmed</h3>
        <p>Thank you for booking a servicing appointment with us!</p>
        <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
    };

    // Send emails
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ message: "Form submitted and emails sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

module.exports = { servicingFormController };
