const Product = require("../models/productModelDB");
const express = require("express");
const cors = require("cors");
const {
  productValid,
  productValidUpdate,
} = require("../validation/productValidation");
const app = express();
// app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const getProducts = async (req, res) => {
  const Products = await Product.find({});
  res.status(200).send(Products);
  // res.render('product',{getPro:Products})
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const ProductById = await Product.findOne({ _id: id });
    if (!ProductById) {
      res.status(404).send("this product not found");
      return;
    } else {
      res.status(200).send(ProductById);
    }
  } catch (error) {
    res.status(404).send("this product not found");
  }
};
const getProductByCategory = async (req, res) => {
  try {
    const { cate } = req.params;

    const ProductByCate = await Product.find({ proCategory: cate });
    if (!ProductByCate) {
      res.status(404).send("this product not found");
      return;
    } else {
      res.status(200).send(ProductByCate);
    }
  } catch (error) {
    res.status(404).send("this Category not found");
  }
};

const addProduct = async (req, res) => {
  try {
    const { error, value } = productValid(req.body);
    console.log(req.body);
    console.log(value);
    console.log(error);
    if (error) {
      //  bad request
      res.status(400).send({ message: `Invalid form field..${error}` });
      return;
    }
    // const value =req.body
    const newProduct = await Product.create(value);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { error, value } = productValidUpdate(req.body);
    if (error) {
      res.status(400).send({ message: `Invalid form field..${error}` });
      return;
    }

    const product = await Product.findOne({ _id: id });
    if (!product) {
      res.status(404).send("this product not found");
      return;
    } else {
      await Product.updateOne({ _id: id }, req.body);

      const updatedProduct = await Product.findOne({ _id: id });

      res.send(updatedProduct);
    }
  } catch (error) {
    res.status(404).send(`${error}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    console.log(product);
    if (!product) {
      res.status(404).send("this product not found");
      return;
    } else {
      await Product.deleteOne({ _id: id });

      res.send(product);
    }
  } catch (error) {
    res.status(404).send("this product not found");
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  getProductByCategory,
};
