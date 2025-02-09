const mongoose = require("mongoose");

const secondHandCarsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  carName: { type: String, required: true },
  condition: { type: String, required: true },
  conditionDesc: { type: String, required: true },
  carPhotos: [{ type: String }],  
  sellingPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SecondHandCarOrder", secondHandCarsSchema);
