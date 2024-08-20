const wrapAsync = require("../utils/wrapAsync")
const httpStatusText = require("../utils/httpStatusText")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const appError = require("../utils/appError")
const generateToken = require("../utils/generateJWT");

const createUser= wrapAsync(async (req,res,next)=>{
    const {firstName, lastName, email, password, image} = req.body
    if (!firstName || !lastName || !password || !email ) {
        return next(new appError('Please provide all the required fields', 400));
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_\-+?&])[A-Za-z\d@$!%*_\-+?&]{8,}$/
    if (!password.match(passwordPattern)) {
        return next(new appError('Password must be at least 8 characters long, contain at least 1 uppercase character 1 special charachter and 1 number',400))
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        firstName,
        lastName,
        email:email.toLowerCase(),
        password:hashedPassword,
        image:req.file.filename
    })
    await user.save().then(async ()=>{
        const token = await generateToken({
            id: user._id,
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email,
        })
        console.log("You are logged in")
        res.cookie('token', token, {    
            httpOnly: true, 
            secure: false, 
            sameSite: 'Lax', 
            maxAge: 86400000
        });
        res.status(201).json({status: httpStatusText.SUCCESS, data: {user}})
    })
    .catch((err)=>{
        if (err.code === 11000){
            return next(new appError(`User ${user.email} already exists`, 400))
        }
        next(err)
    })
 
})

const getUser = (wrapAsync(async (req,res,next)=>{
    const email = req.currentUser.email
    const user = await User.findOne({email})
    if (!user) {
        return next(new appError('User not found', 404));
    }
    res.status(200).json({status:httpStatusText.SUCCESS, data: {user}})
    }))


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
    createUser,
    getUser
}