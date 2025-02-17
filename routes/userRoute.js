const express = require("express");
const { getOrdersByUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// Route to fetch orders for a specific user
router.get("/getAllOrders",authMiddleware, getOrdersByUser);

module.exports = router;
