const wrapAsync = require("../utils/wrapAsync")
const httpStatusText = require("../utils/httpStatusText")
const Admin = require("../models/admin.model")
const bcrypt = require("bcrypt")
const appError = require("../utils/appError")
const generateToken = require("../utils/generateJWT");

const createAdmin= wrapAsync(async (req,res,next)=>{
    const {username, password} = req.body
    const allAdmin = await Admin.find()
    if(allAdmin.length >= 1) {
        return next(new appError("Admin already exists, Only 1 admin available for the website", 400))
    }
    if (!username || !password ) {
        return next(new appError('Please provide all the required fields', 400));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUsername = username.toLowerCase()
    const admin = new Admin({
        username: newUsername,
        password:hashedPassword
    })
    await admin.save()
    res.status(201).json({status: httpStatusText.SUCCESS, data: {admin}})
})

const loginAdmin= wrapAsync(async (req,res,next)=>{
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username.toLowerCase()})
    if(!admin){
        return next(new appError("Invalid username or password",404))
    }
    const isPassword = await bcrypt.compare(password,admin.password)
    if(!isPassword){
        return next(new appError("Invalid username or password",404))
    }
    const token = await generateToken({
        id: admin._id,
        username: admin.username,
        role: admin.role,
    })
    console.log("You are logged in")
    res.cookie('token', token, {    
        httpOnly: true, 
        secure: false, 
        sameSite: 'Lax', 
        maxAge: 180000
    });
    res.status(200).json({status:httpStatusText.SUCCESS,data:{admin}})
})

const editAdmin= wrapAsync(async (req,res,next)=>{
    const {username} = req.params
    const admin = await Admin.findOne({username})
    if(!admin){
        return next(new appError("This admin doesn't exist",404))
    }
    req.body.password = await bcrypt.hash(req.body.password,12)
    Object.assign(admin, req.body);
    await admin.save()
    res.status(201).json({status: httpStatusText.SUCCESS, data: {admin}})
})

module.exports= {
    createAdmin,
    loginAdmin,
    editAdmin
}