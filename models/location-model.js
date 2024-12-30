const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    mapLink: {
      type: String  
    }
  }
);

const Location = mongoose.model("locations", locationSchema);

module.exports = Location;
