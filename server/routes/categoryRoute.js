const express = require('express');
const categoryValidation = require('../validation/categoryValidation');
const{getCategories,getCategoryById,addCategory,editCategory} =require('../controllers/categoryController')
const categoriesRouter = express.Router();

categoriesRouter.get('/' ,getCategories);
categoriesRouter.get('/:id' ,getCategoryById);
categoriesRouter.post("/add",addCategory);
// categoriesRouter.patch("/:id",editCategory);

module.exports = categoriesRouter;