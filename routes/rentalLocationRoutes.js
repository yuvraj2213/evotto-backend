const rentalLocation = require("../controllers/rentalLocationController")

const express=require('express')
const router=express.Router()

router.get('/rentalLocation',rentalLocation)

module.exports=router;