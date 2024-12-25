const RentalVehicle = require("../models/vehicleCards-model");

const rentalVehicle = async (req, res) => {
  try {
    const response = await RentalVehicle.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = rentalVehicle;
