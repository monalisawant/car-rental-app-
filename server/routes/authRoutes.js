const express = require("express");
const route = express.Router();
const {registerController,loginController,forgotPasswordController} = require("../controllers/authController")

//registration
route.post("/register",registerController)

//login
route.post("/login",loginController)

//forgot password
route.post("/forgot-password",forgotPasswordController)

module.exports = route;