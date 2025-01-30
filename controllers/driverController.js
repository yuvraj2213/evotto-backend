const User = require("../models/user-model");
const DriverOrders=require("../models/driver-order");

const getAllDriver = async (req, res) => {
  try {
    const response = await User.find({ isDriver: true });
    ;

    if (!response) {
      res.status(400).send("Can't fetch the drivers");
    }

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

const updateDriverStatus = async (req, res) => {
  try {
    const { isDriverOnline } = req.body;
    const driverId = req.user.id; 

    if (typeof isDriverOnline !== "boolean") {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const driver = await User.findByIdAndUpdate(
      driverId,
      { isDriverOnline },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Status updated successfully", driver });
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptOrder = async (req, res) => {
  const { orderId } = req.params;
  const driverId = req.user._id; 

  try {

    const updatedOrder = await DriverOrders.findByIdAndUpdate(
      orderId,
      { isAccepted: true },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Now, add the order ID to the driver's driverOrders array
    const updatedDriver = await User.findByIdAndUpdate(
      driverId,
      { $push: { driverOrders: orderId } },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Order accepted and added to driver's bookings",
      order: updatedOrder,
      driver: updatedDriver,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to accept order" });
  }
};

module.exports = {getAllDriver,updateDriverStatus,acceptOrder};
