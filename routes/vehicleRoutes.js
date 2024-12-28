const vehicleController=require('../controllers/vehicleController')

const express=require('express')
const router=express.Router()

router.get('/vehicle/:id',vehicleController)

module.exports=router;