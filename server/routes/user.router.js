const express = require("express");
const router = express.Router();

const { createNewUser,login,getCurrentUser,updateUserProfile} = require("../controllers/user.controller");





router.post("/register",createNewUser);

router.post("/login",login );

router.get("/profile",getCurrentUser );

router.patch("/profile",updateUserProfile );




module.exports = router;