const { boolean } = require("joi");
const mongoose = require("mongoose");


const userSchema =  mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:255,
    },
    passwordHash:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:1024,
    },
   
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    img:{
        type:String,
        default:"https://i.pinimg.com/564x/84/c4/3f/84c43fce22c82dc5bfe8d55d90557c88.jpg"
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;