const DriverOrders = require("../models/driver-order");

const getAllDriverOrders = async (req, res) => {
  try {
    const response = await DriverOrders.find();

    if (!response) {
      res.status(400).send("Can't fetch the orders");
    }

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {getAllDriverOrders};
