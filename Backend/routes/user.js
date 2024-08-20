const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifytoken");
const userController = require("../controllers/user.controller")
const upload = require("../middlewares/imageUpLoader")
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/users.roles");
const isvalidUserReq = require("../middlewares/isValid UserReq")



router.post("/register",upload.single("image"),userController.createUser)

router.get("/show",verifyToken,userController.getUser)

router.post("/login" ,isvalidUserReq.loginValidation(), userController.loginUser);


module.exports = router; 
