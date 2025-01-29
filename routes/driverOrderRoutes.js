const express = require("express");
const { getAllDriverOrders } = require("../controllers/driverOrdersController");
const { driverFormController } = require("../controllers/driverFormController");

const router = express.Router();

router.get("/getAllDriverOrders", getAllDriverOrders);

router.post("/driverForm", driverFormController);

module.exports = router;
