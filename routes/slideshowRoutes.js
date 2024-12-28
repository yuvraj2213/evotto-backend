const slideshowImg = require("../controllers/slideshowController")

const express=require('express')
const router=express.Router()

router.get('/slideshow',slideshowImg)

module.exports=router;