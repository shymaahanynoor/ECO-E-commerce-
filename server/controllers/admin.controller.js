const adminServices=require('../services/admin.service');
const express = require('express');

const getUsers=async(req,res)=>{
    const users = await adminServices.getAllUsers();
    res.send(users);
}

const getOrders=async(req,res)=>{
    const orders = await adminServices.getAllOrders();
    res.send(orders);
}

const getCategories=async(req,res)=>{
    const categories = await adminServices.getAllCategories();
    res.send(categories);
}

const getProducts=async(req,res)=>{
    const products = await adminServices.getAllProducts();
    res.send(products);
}

module.exports={
    getCategories,
    getOrders,
    getProducts,
    getUsers
}