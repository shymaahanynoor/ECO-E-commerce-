const joi = require('joi');

const validateNewUser = (user)=>{              //server side validations
    const schema = joi.object({
        userName : joi.string().min(3).max(50).required(),
        userEmail : joi.string().min(3).max(255).required(),
        userPassword: joi.string().min(3).max(1024).required()   
        //cart:joi.array(),
        //orders:joi.array()
    });
    return schema.validate(user);                         //return error and value

};

const validateLoginUser = (user)=>{
    const schema = joi.object({
        userEmail : joi.string().min(3).max(255).required(),
        userPassword : joi.string().min(3).max(1024).required()
    });
    return schema.validate(user);                         //return error and value

};



const validateEditUser = (user)=>{              //server side validations
    const schema = joi.object({
        userName : joi.string().min(3).max(50).required(),
        userEmail : joi.string().min(3).max(255).required(),
        img: joi.string()
        //.pattern("^(http(s?):\/\/)([^\s\/]+)(\/.+)(\.(jpg|jpeg|png|gif|bmp))$")   
        //cart:joi.array(),
        //orders:joi.array()
    });
    return schema.validate(user);                         //return error and value

};




module.exports ={
    validateNewUser,
    validateLoginUser,
    validateEditUser
}