const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifytoken");
const userController = require("../controllers/user.controller")
const upload = require("../middlewares/imageUpLoader")
const isvalidUserReq = require("../middlewares/isValid UserReq")



router.post("/register",upload.single("image"),userController.createUser);

router.get("/show",verifyToken,userController.getUser);

router.post("/login" ,isvalidUserReq.loginValidation(), userController.loginUser);

router.patch("/addreview/:id",verifyToken,userController.addReview);

router.patch("/userBooks/edit" , verifyToken,isvalidUserReq.addChangeUserBookValid(), userController.addChangeUserBook);

router.get("/userBooks",verifyToken,userController.getUserBooks);


module.exports = router; 
