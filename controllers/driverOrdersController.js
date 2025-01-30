const DriverOrders = require("../models/driver-order");
const User=require("../models/user-model")

const getAllDriverOrders = async (req, res) => {
  try {
    const response = await DriverOrders.find({isAccepted:false});

    if (!response) {
      res.status(400).send("Can't fetch the orders");
    }

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

const getOrderByIds = async (req, res) => {
  try {
    const driverId = req.user._id; // Assuming the user ID is available in `req.user` from authentication
    const user = await User.findById(driverId);

    if (!user) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Retrieve all orders based on order IDs in the driver's `driverOrders` field
    const orderIds = user.driverOrders; // Assuming `driverOrders` is an array of order IDs

    if (!orderIds || orderIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this driver" });
    }


    const orders = await DriverOrders.find({ _id: { $in: orderIds } });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders match the provided IDs" });
    }

    return res.status(200).json({ orders });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllDriverOrders , getOrderByIds};
