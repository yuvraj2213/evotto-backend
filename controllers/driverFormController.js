const DriverOrders = require("../models/driver-order");

const driverFormController = async (req, res) => {
  try {
    const { name, email, phone, date, time, location, duration } = req.body;

    // Validation
    if (!name || !email || !phone || !date || !time || !location || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the order to the database
    const newOrder = new DriverOrders({
      name,
      email,
      phone,
      date,
      time,
      location,
      duration,
    });

    await newOrder.save();
    res.status(201).json({ message: "Driver booked successfully!" });
  } catch (error) {
    console.error("Error saving driver booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  driverFormController,
};
