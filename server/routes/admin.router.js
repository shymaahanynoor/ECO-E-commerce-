const express = require('express');
const { getOrders, getUsers, getCategories, getProducts } = require('../controllers/admin.controller');
const {UpdateOrderState}=require("../controllers/orderControllers");
const adminRouter = express.Router();

adminRouter.get('/users',getUsers)
adminRouter.get('/orders',getOrders)
adminRouter.get('/categories',getCategories)
adminRouter.get('/products',getProducts)
adminRouter.put("/orders/updateStatus/:id", UpdateOrderState)
module.exports=adminRouter;
