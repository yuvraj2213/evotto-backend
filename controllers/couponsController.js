const Coupon = require("../models/coupon-model");

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
};

const addCoupons = async (req, res) => {
  const { code, discount } = req.body;

  if (!code || !discount) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const newCoupon = new Coupon({ code, discount });
    await newCoupon.save();

    res.status(201).json({ message: "Coupon added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding coupon" });
  }
};

const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    res.json({ msg: "Coupon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { getAllCoupons, addCoupons, deleteCoupon };
