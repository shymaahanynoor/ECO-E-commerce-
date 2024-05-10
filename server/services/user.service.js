const User = require("../models/user.schema");         //User is a class



const createUserService = async (user) =>{
    try{
        return await User.create(user);
    }
    catch(createUserServiceError){
        console.log(`createUserServiceError:${createUserServiceError}`);
    }
}




const findUserService = async (userEmail) =>{
    try{
    return await User.findOne({userEmail:userEmail});
    }
    catch(findUserServiceError){
     console.log(`findUserServiceError:${findUserServiceError}`);
    }
}





const updateUserService = async (userEmail,updatedBody) =>{
    try{
    return await User.updateOne({userEmail:userEmail},updatedBody);
    }
    catch(updateUserError){
        console.log(`updateUserServiceError:${updateUserError}`);
    }
}











module.exports = {
    createUserService,
    findUserService,
    updateUserService 
}