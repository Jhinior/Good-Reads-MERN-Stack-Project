const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifytoken");
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/users.roles");
const userController = require("../controllers/user.controller");
const isvalidUserReq = require("../middlewares/isValid UserReq")


router.post("/login" ,isvalidUserReq.loginValidation(), userController.loginUser);


module.exports = router; 