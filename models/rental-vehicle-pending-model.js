const mongoose = require("mongoose");

const pendingVehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    kmRunning: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PendingVehicle = new mongoose.model("pendingVehicle", pendingVehicleSchema);

module.exports = PendingVehicle;