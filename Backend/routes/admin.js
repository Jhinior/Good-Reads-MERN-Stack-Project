const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wraper")
const mongoose = require("mongoose")
const {Schema} = mongoose
const Admin = require("../models/admin.model")
const Book = require("../models/book.model")
const Author = require("../models/author.model")
const Category = require("../models/category.model")
const AppError = require("../utils/appError")




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

router.get("/book",wrapAsync(async (req,res,next)=>{
   const books = await Book.find()
   res.send(books)
}))

router.post("/book/add",wrapAsync(async (req,res,next)=>{
    const {firstName, lastName, dob, books, photo} = req.body
    if (!firstName || !lastName || !dob ) {
        return next(new AppError('Please enter required data', 400));
      }
    const oldAuthor = await Author.findOne().sort({ id: -1 })
    const oldId = (oldAuthor).id
    let newId
    if(!oldId){
         newId =  1
    }else{
         newId = parseInt(oldId) + 1
    }
    const author = new Author({
        id:newId,
        firstName,
        lastName,
        dob,
        books,
        photo
    })
    author.save()
    .then(a => {
        console.log(a)
        res.send(`Author ${a.firstName} ${a.lastName} added successfuly to the database`)
    })
    .catch(e => console.log(e))
}))
 
router.get("/author",wrapAsync(async (req,res,next)=>{
    const authors = await Author.find()
    res.send(authors)
}))

router.post("/author/add",wrapAsync(async (req,res,next)=>{
    const {firstName, lastName, dob, books, photo} = req.body
    if (!firstName || !lastName || !dob ) {
        return next(new AppError('Please enter required data', 400));
      }
    const oldAuthor = await Author.findOne().sort({ id: -1 })
    const oldId = (oldAuthor).id
    let newId
    if(!oldId){
         newId =  1
    }else{
         newId = parseInt(oldId) + 1
    }
    const author = new Author({
        id:newId,
        firstName,
        lastName,
        dob,
        books,
        photo
    })
    author.save()
    .then(a => {
        console.log(a)
        res.send(`Author ${a.firstName} ${a.lastName} added successfuly to the database`)
    })
    .catch(e => console.log(e))
}))


router.get("/category",wrapAsync(async (req,res,next)=>{
    const categories = await Category.find()
    res.send(categories)
}))

router.post("/category/add",wrapAsync(async (req,res,next)=>{
    const categoryName = req.body.name
    const cate = await Category.findOne({name:categoryName})
    if(cate){
        return next(new AppError(`Category ${cate.name} already exists`, 400));
      }
    if (!categoryName) {
        return next(new AppError('Please enter Category name', 400));
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