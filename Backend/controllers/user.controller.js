const wrapAsync = require("../utils/wrapAsync");
const httpStatusText = require("../utils/httpStatusText");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const appError = require("../utils/appError");
const generateToken = require("../utils/generateJWT");
const { validationResult } = require("express-validator");



const loginUser = wrapAsync(async(req , res , next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new appError (errors.array(), 400, httpStatusText.FAIL));
    }
    const {email , password} = req.body;
    const userExist = await user.findOne({email: email.toLowerCase()})
    if(!userExist){
        next(new appError("Email doesn't exist" , 404, httpStatusText.FAIL));
    }
    const isPassword = await bcrypt.compare(password,userExist.password)
    if(!isPassword){
        return next(new appError("Invalid password",404 , httpStatusText.FAIL))
    }
    const token = await generateToken({
        id: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        role: userExist.role,
    }) 
        res.cookie('token', token, {    
        httpOnly: true, 
        secure: false, 
        sameSite: 'Lax', 
        maxAge: 86400000
    });
    res.status(200).json({status:httpStatusText.SUCCESS,data:{userExist}})

})

module.exports = {
    loginUser,
}