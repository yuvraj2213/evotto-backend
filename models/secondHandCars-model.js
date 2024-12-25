const mongoose = require("mongoose");

const secondHandCarsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  weekendPrice: {
    type: String,
    require: true,
  },
});

const SecondHandCar = new mongoose.model("secondhandcar", secondHandCarsSchema);

module.exports = SecondHandCar;