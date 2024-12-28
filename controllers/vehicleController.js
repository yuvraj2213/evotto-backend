const Vehicle = require("../models/vehicleCards-model");

const vehicle = async (req, res) => {
  try {
    const id=req.params.id;
    const response = await Vehicle.find({_id:id});

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = vehicle;
