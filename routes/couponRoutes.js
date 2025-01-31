const express = require("express");
const {getAllCoupons, addCoupons, deleteCoupon} = require("../controllers/couponsController");

const router = express.Router();

router.get('/getAllCoupons',getAllCoupons);
router.post('/addCoupons',addCoupons);
router.delete('/deleteCoupon/:id',deleteCoupon);

module.exports=router;