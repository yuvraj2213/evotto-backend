const express = require("express");
const { getAllDriverOrders, getOrderByIds } = require("../controllers/driverOrdersController");
const { driverFormController } = require("../controllers/driverFormController");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.get("/getAllDriverOrders", getAllDriverOrders);
router.get("/getOrderByIds",authMiddleware, getOrderByIds);

router.post("/driverForm", driverFormController);

module.exports = router;
