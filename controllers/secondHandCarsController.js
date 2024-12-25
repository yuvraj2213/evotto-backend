const SecondHandCar = require("../models/secondHandCars-model");

const secondHandCars = async (req, res) => {
  try {
    const response = await SecondHandCar.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = secondHandCars;
