const mongoose = require("mongoose");

const vehicleCardSchema = new mongoose.Schema({
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

const RentalVehicleCard = new mongoose.model("rentalvehicle", vehicleCardSchema);

module.exports = RentalVehicleCard;