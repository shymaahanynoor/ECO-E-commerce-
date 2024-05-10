const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  proName: { type: String, trim: true, required: true, minlength: 3 },
  proDescription: { type: String, trim: true, required: true, minlength: 5 },
  proCategory: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
  },
  proPrice: { type: String, required: true, min: 1 },
  proImg: { type: String, trim: true, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
