const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/OrdersController");
router.get("/", (req, res) => {
  res.send("Hello NODE API");
});
router.get("/orders", OrdersController.getAllOrders);
router.post("/orders", OrdersController.createOrder);
router.get("/orders/:orderId", OrdersController.getOrderById);
router.put("/orders/:orderId", OrdersController.updateOrder);
router.delete("/orders/:orderId", OrdersController.deleteOrder);
module.exports = router;
