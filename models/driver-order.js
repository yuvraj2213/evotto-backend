const mongoose = require("mongoose");

const driverOrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    email: {
      type: String,
      required:true,  
    },
    phone:{
        type:String,
        required:true
    },
    date: {
      type: String,
      required:true,  
    },
    time:{
        type:String,
        required:true
    },
    location: {
      type: String,
      required:true,  
    },
    duration:{
        type:String,
        required:true
    },

  }
);

const DriverOrders = mongoose.model("driverorders", driverOrdersSchema);

module.exports = DriverOrders;
