const RentalLocation = require("../models/location-model");

const rentalLocation = async (req, res) => {
  try {
    const response = await RentalLocation.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = rentalLocation;
