const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
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
  }
);

const Driver = mongoose.model("drivers", driverSchema);

module.exports = Driver;
