const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    vendor:{
        type:String,
        required:true
    },
    vendorId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
    },
    isCancelled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
