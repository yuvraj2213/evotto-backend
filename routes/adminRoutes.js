const express=require('express');
const userDetails = require('../controllers/adminController');
const router=express.Router();

router.get('/users',userDetails)

module.exports=router;