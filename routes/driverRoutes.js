const express = require("express");
const {getAllDriver, updateDriverStatus, acceptOrder} = require("../controllers/driverController");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.get('/getAllDrivers',getAllDriver);
router.patch("/changeStatus", authMiddleware, updateDriverStatus);

// Accepting a order
router.patch("/acceptOrder/:orderId", authMiddleware, acceptOrder);

module.exports=router;