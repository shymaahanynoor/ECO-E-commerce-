const express = require("express");

const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  getProductByCategory,
} = require("../controllers/productControllerDB");
const { productValid } = require("../validation/productValidation");
const { adminAuth } = require("../middleware/adminAuth");
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/cate/:cate", getProductByCategory);
productRouter.get("/:id", getProductById);
productRouter.post("/",addProduct);
productRouter.patch("/:id", adminAuth, editProduct);
productRouter.delete("/:id", adminAuth, deleteProduct);
module.exports = productRouter;
