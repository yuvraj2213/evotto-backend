const {rentalVehicle,rentalVehicleReview} = require("../controllers/rentalVehicleController")

const express=require('express')
const router=express.Router()

router.get('/rentalVehicles',rentalVehicle)

router.post('/rentalVehicle/:id/review',rentalVehicleReview)

module.exports=router;