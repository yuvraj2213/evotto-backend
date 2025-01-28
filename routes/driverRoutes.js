const express = require("express");
const {getAllDriver} = require("../controllers/driverController");

const router = express.Router();

router.get('/getAllDrivers',getAllDriver);

module.exports=router;