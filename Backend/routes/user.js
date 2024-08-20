const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifytoken");
const userController = require("../controllers/user.controller")
const upload = require("../middlewares/imageUpLoader")




router.post("/register",upload.single("image"),userController.createUser)
router.get("/show",verifyToken,userController.getUser)

module.exports= router