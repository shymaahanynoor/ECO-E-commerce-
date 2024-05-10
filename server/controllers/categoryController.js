const categoryModel = require ("../models/categoryModel");
const express = require("express");
const { validateCategory } = require("../validation/categoryValidation");

const app = express();
// app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getCategories = async (req,res) =>{
    const categories = await categoryModel.find({})
    res.status(200).send(categories);
    // res.render('category',{getCat:categories})
}

const getCategoryById = async (req,res)=> {
    const {id} = req.params;
    try{
    const categoryById = await categoryModel.findById(id)

    if(!categoryById  ) {
        res.status(404).send("this category not found")
           return ;
        }
        else{
            res.status(200).send(categoryById);
        };
        }catch(error){
            res.status(404).send(error.message)
        }
    
}

const addCategory = async (req,res)=> {
    const {error, value} = validateCategory(req.body);
    console.log (req.body)
    console.log(value)
    if (error) {
        //  bad request
        res.status(400).send({message:`Invalid form field..${error}`})
        return;
    }
    const newCategory = await categoryModel.create(value)
    res.status(200).send(newCategory);
    
}

// const editCategory = async (req,res,next)=> {
//     try{
//         const {id} = req.params;
//         const {category} = req.body;
//         await categoryModel.findByIdAndUpdate(id,{categoryName:category});
//         res.status(200).send ({message:"category updated"});
//     }
//     catch (error){
//         next(error)y
//     }
// }

module.exports = {
    getCategories,
    getCategoryById,
    addCategory
}