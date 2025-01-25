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
  sixhrPrice: {
    type: String,
    require: true,
  },
  twelvehrPrice: {
    type: String,
    require: true,
  },
  twentyfourhrPrice: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  isAvailable:{
    type:Boolean,
    require:true,
  },
  rating:{
    type:String,
    require:true,
  },
  reviews: [
    {
      user: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: String, 
        required: true,
      },
    },
  ],
  location: {
    type: [String], // Array of strings
    default: [], // Defaults to an empty array
  },
});

const RentalVehicleCard = new mongoose.model("rentalvehicle", vehicleCardSchema);

module.exports = RentalVehicleCard;