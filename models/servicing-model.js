const mongoose = require("mongoose");

const servicingSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleImage: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Servicing = mongoose.model("servicings", servicingSchema);

module.exports = Servicing;
