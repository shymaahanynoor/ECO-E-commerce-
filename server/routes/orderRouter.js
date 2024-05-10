const express = require("express");
const {
  getAllOrders,
  getOrderById,
  getOrderByUserEmail,
  deleteOrder,
  addOrder,
  UpdateOrderState,
} = require("../controllers/orderControllers");
const { adminAuth } = require("../middleware/adminAuth");
const ordersRouter = express.Router();

ordersRouter.post("/add", addOrder);
ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOrderById);
// ordersRouter.get('/user/:Email', getOrderByUserEmail);
// ordersRouter.delete("/:id", deleteOrder)
ordersRouter.put("/updateStatus/:id", adminAuth, UpdateOrderState);
ordersRouter.delete("/:id/cancel", deleteOrder);

module.exports = ordersRouter;
