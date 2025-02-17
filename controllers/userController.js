const Order = require("../models/rental-order-model");

// Get all orders for a specific user
const getOrdersByUser = async (req, res) => {
    try {
        const userId  = req.user._id;
        console.log(userId)

        // Find all orders where userId matches
        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

module.exports = { getOrdersByUser };
