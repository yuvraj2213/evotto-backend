const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,  
    },
    discount: {
      type: String,
      required:true
    }
  }
);

const Coupon = mongoose.model("coupons", couponSchema);

module.exports = Coupon;
