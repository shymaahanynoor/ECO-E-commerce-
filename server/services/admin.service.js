const User = require('../models/user.schema') 
const Product = require('../models/productModelDB') 
const Categories = require('../models/categoryModel') 
const Order = require('../models/orderModel')
const getAllUsers= async ()=> {
    return await User.find({});
}
const getAllOrders=async()=> {
    return await Order.find({});
}
const getAllProducts= async ()=> {
    return await Product.find({});
}
const getAllCategories= async ()=> {
    return await Categories.find({});
}

module.exports= {
    getAllCategories,
    getAllOrders,
    getAllProducts,
    getAllUsers
}