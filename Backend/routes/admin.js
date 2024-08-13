const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wraper")
const mongoose = require("mongoose")
const {Schema} = mongoose
const Admin = require("../models/admin.model")
const Category = require("../models/category.model")
const AppError = require("../utils/appError")


router.get("/",(req,res)=>{
    res.send("Hello i am the admin")
})

router.post("/",wrapAsync(async (req,res,next)=>{
    const {username,password} = req.body
    if (!username || !password) {
        return next(new AppError('Username and password are required', 400));
      }
    const admin = await Admin.findOne({username})
    console.log(username,password,admin)
    if(admin){
        if (password === admin.password){
            res.send("Admin logged in")
        }else{
            next(new AppError("False password for admin username",400))
        }
    }else{
        next(new AppError(`Username ${username} doesn't exist`,400))
    }
}))

router.post("/addcategory",wrapAsync(async (req,res,next)=>{
    const categoryName = req.body.name


    if (!categoryName) {
        return next(new AppError('Please enter Ctegory name', 400));
      }
    const oldCategory = await Category.findOne().sort({ id: -1 })
    const oldId = (oldCategory).id
    let newId
    if(!oldId){
         newId =  1
    }else{
         newId = parseInt(oldId) + 1
    }
    const category = new Category({
        id:newId,
        name:categoryName
    })
    category.save()
    .then(c => {
        console.log(c)
        res.send(`Category ${c.name} added successfuly to the database`)
    })
    .catch(e => console.log(e))
}))


module.exports = router