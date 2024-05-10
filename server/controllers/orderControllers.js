const orderModel = require("../models/orderModel");
const express = require("express");

const app = express();
// app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getAllOrders = async (req, res) => {
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");

  let cookieUserEmail = "mustafa.abdo4941@gmail.com";

  // let cart = await Cart().findById({ userId: cookieUserEmail });
  let order = await orderModel.find({
    userEmail: cookieUserEmail,
  });
  //   let cookieUserEmail = req.body.userId;
  //   let cart = await Cart().find({ userId: cookieUserEmail });
  if (order) {
    res.send(order);
    // res.render("../views/cart/cart.ejs", { allCartPro: cart });
  } else {
    return res.status(404).send(`User With Id: ${cookieUserEmail} Not Found`);
  }
};

// const getOrderByUserEmail = async (req,res)=>{
//     const {Email} = req.params;
//     const orderByEmail = await orderModel.find({userEmail:Email});
//     // console.log(orderByEmail );
//     res.status(200).send(orderByEmail);
// }

const getOrderById = async (req, res) => {
  let cookieUserEmail = "mustafa.abdo4941@gmail.com";

  let productIdParam = req.params.id;
  let findFromOrder = await orderModel.find({
    proId: productIdParam,
    userEmail: cookieUserEmail,
  });
  if (findFromOrder) {
    // res.send("Product Deleted Successfuly");
    res.status(200).send(findFromOrder);
  } else {
    return res
      .status(404)
      .send(
        `User With Id: ${cookieUserEmail} or Product With Id: ${productIdParam} Not Found`
      );
  }
};

const deleteOrder = async (req, res, next) => {
  let cookieUserEmail = "mustafa.abdo4941@gmail.com";
  oStatus = "pending";
  let productIdParam = req.params.id;
  let DelOneOrder = await orderModel.findOneAndDelete({
    proId: productIdParam,
    userEmail: cookieUserEmail,
  });
  if (DelOneOrder) {
    // res.send("Product Deleted Successfuly");
    res.status(200).send();
  } else {
    return res
      .status(404)
      .send(
        `User With Id: ${cookieUserEmail} or Product With Id: ${productIdParam} Not Found`
      );
  }
};

const addOrder = async (req, res, next) => {
  order = new orderModel({
    proId: req.body.proId,
    proName: req.body.proName,
    proDescription: req.body.proDescription,
    proCategory: req.body.proCategory,
    proPrice: req.body.proPrice,
    proImg: req.body.proImg,
    userEmail: req.body.userEmail,
    quantity: req.body.quantity,
    orderStatus: "pending",
  });
  order.save().then(() => {
    res.send(order);
    // res.redirect("/")
    // res.sendStatus(200);
  });
};
const UpdateOrderState = async (req, res) => {
  const id = req.params.id;
  const newState = req.body.state;
  try {
    const order = await orderModel.findByIdAndUpdate(
      id,
      { orderStatus: newState },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json({ message: "Order state updated successfully", order });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal server error in the order controller" });
  }
};

module.exports = {
  getAllOrders,
  // getOrderByUserEmail,
  getOrderById,
  deleteOrder,
  addOrder,
  UpdateOrderState,
};
