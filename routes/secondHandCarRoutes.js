const secondHandCars = require("../controllers/secondHandCarsController");
const express = require("express");
const router = express.Router();

router.get("/secondHandCars", secondHandCars);

module.exports = router;
