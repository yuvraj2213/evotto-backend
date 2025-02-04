const express = require("express");
const {getAllVehicles, totalRevenue} = require('../controllers/vendorController');

const router = express.Router();

router.get('/getAllVehicles/:vendorId',getAllVehicles)

router.get('/totalRevenue/:vendorId',totalRevenue)

module.exports=router;