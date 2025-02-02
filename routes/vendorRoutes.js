const express = require("express");
const {getAllVehicles} = require('../controllers/vendorController');

const router = express.Router();

router.get('/getAllVehicles/:vendorId',getAllVehicles)

module.exports=router;