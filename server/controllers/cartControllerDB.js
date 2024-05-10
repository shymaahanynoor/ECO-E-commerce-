const Cart = require("../models/cartModelDB");
const express = require("express");
const cookiesParser = require("cookie-parser");
const cartValidationRouts = require("../validation/cartValidation");
const ejs = require("ejs");
const app = express();
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
const path = require("path");
const { type } = require("os");
app.use(express.static("public"));

//Get the current user's shopping cart using _id

let getUserCart = async (req, res) => {
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");

  let cookieUserEmail = req.params.email;

  // let cart = await Cart().findById({ userId: cookieUserEmail });
  let cart = await Cart.find({
    userEmail: cookieUserEmail,
  });
  //   let cookieUserEmail = req.body.userId;
  //   let cart = await Cart().find({ userId: cookieUserEmail });
  if (cart) {
    res.send(cart);
    // res.render("../views/cart/cart.ejs", { allCartPro: cart });
  } else {
    return res.status(404).send(`User With Id: ${cookieUserEmail} Not Found`);
  }
};
// Add a product to the shopping cart
let addNewProToUserCart = async (req, res) => {
  let valid = cartValidationRouts(req.body);
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");

  let ifExist = await Cart.findOne({
    proId: req.body.proId,
    userEmail: req.body.email,
  });
  let cart;
  if (ifExist) {
    let newQuantity = (
      parseInt(ifExist.quantity) + parseInt(req.body.quantity)
    ).toString();
    cart = await Cart.updateOne(
      { proId: req.body.proId, userEmail: req.body.userEmail },
      { $set: { quantity: newQuantity.toString() } }
    );

    res.send(newQuantity);
  } else {
    cart = new Cart({
      proId: req.body.proId,
      proName: req.body.proName,
      proDescription: req.body.proDescription,
      proCategory: req.body.proCategory,
      proPrice: req.body.proPrice,
      proImg: req.body.proImg,
      userEmail: req.body.userEmail,
      quantity: req.body.quantity,
    });
    // let cart = new Cart(req.body);

    if (valid) {
      cart
        .save()
        .then(() => {
          res.send(cart);
          // res.redirect("/")
          // res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).send("Bad Request In Cart: " + err.errors);
        });
    } else {
      res.status(403).send("Data Validation Routs Not Valid");
    }
  }
};
//Update a product in the shopping cart.
let updateProInUserCart = async (req, res) => {
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");
  // let productIdParam = req.params.proId;

  let productIdParam = req.params.id;

  let upCart = await Cart.findOneAndUpdate(
    { proId: productIdParam },
    req.body,
    {
      returnOriginal: false,
    }
  );
  if (upCart) {
    res.send(upCart);
  } else {
    return res
      .status(404)
      .send(
        `User With Eamil: ${cookieUserEmail} or Product With Id: ${productIdParam} Not Found`
      );
  }
};
//Remove a product from the shopping cart.

let deleteOneProductFromUserCart = async (req, res) => {
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");

  // let productIdParam = req.params.proId;
  // let cookieUserEmail = JSON.parse(req.params.myObj).userId;

  // let productIdParam = JSON.parse(req.params.myObj).proId;

  // let DelOneCart = await Cart.findOneAndDelete({
  //   userId: cookieUserEmail,
  //   proId: productIdParam,
  // });
  let cookieUserEmail = "mustafa.abdo4941@gmail.com";

  let productIdParam = req.params.id;
  let DelOneCart = await Cart.findOneAndDelete({
    proId: productIdParam,
    userEmail: cookieUserEmail,
  });
  if (DelOneCart) {
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
//Clear the entire shopping cart.
let deleteAllUserCart = async (req, res) => {
  // let cookieUserEmail = Buffer.from(req.cookies.id, "base64");
  let cookieuserEmail = "mustafa.abdo4941@gmail.com";

  let DelOneCart = await Cart.deleteMany({ userEmail: cookieuserEmail });
  if (DelOneCart) {
    res.send("Deleted Successfuly");
  } else {
    return res
      .status(404)
      .send(
        `User With Email: ${cookieuserEmail} or Product With Id: ${productIdParam} Not Found`
      );
  }
};

module.exports = {
  getUserCart,
  addNewProToUserCart,
  updateProInUserCart,
  deleteOneProductFromUserCart,
  deleteAllUserCart,
};
