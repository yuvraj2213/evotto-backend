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
  weekdayPrice: {
    type: String,
    require: true,
  },
  weekendPrice: {
    type: String,
    require: true,
  },
  isAvailable:{
    type:Boolean,
    require:true,
  }
});

const RentalVehicleCard = new mongoose.model("rentalvehicle", vehicleCardSchema);

module.exports = RentalVehicleCard;