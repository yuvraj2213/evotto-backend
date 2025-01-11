const nodemailer = require("nodemailer");

const driverFormController = async (req, res) => {
  try {
    const { date, time, location } = req.body;
    const userEmail = req.body.userEmail || "user@example.com";

    const mailToAdmin = {
      from: "your-email@gmail.com",
      to: "yuvraj13preet@gmail.com",
      subject: "New Driver Booking",
      html: `
        <h3>New Driver Booking</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
      `,
    };

    const mailToUser = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Driver Booking Confirmation",
      html: `
        <h3>Driver Booking Confirmed</h3>
        <p>Thank you for booking a Driver!</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${location}</p>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail", 
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
  driverFormController
};
