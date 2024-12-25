const rentalVehicle = require("../controllers/rentalVehicleController")

const express=require('express')
const router=express.Router()

router.get('/rentalVehicles',rentalVehicle)

module.exports=router;