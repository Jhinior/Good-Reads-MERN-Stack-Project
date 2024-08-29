const wrapAsync = require("../utils/wrapAsync")
const httpStatusText = require("../utils/httpStatusText")
const User = require("../models/user.model")
const Book = require("../models/book.model")
const bcrypt = require("bcrypt")
const appError = require("../utils/appError")
const generateToken = require("../utils/generateJWT");
const { validationResult } = require("express-validator");
const { promise } = require("bcrypt/promises")


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
    console.log("here")
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


const loginUser = wrapAsync(async (req , res , next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new appError (errors.array(), 400, httpStatusText.FAIL));
    }
    const {email , password} = req.body;
    const userExist = await User.findOne({email: email.toLowerCase()})
    console.log(userExist)
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

const addReview = wrapAsync(async (req, res , next)=>{
    const {firstName, lastName, email} = req.currentUser
    const {id} = req.params
    const {review} = req.body
    const book = await Book.findOne({id})
    const now = new Date(Date.now());
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear(); 
    const formattedDate = `${day}/${month}/${year}`;
    book.reviews.push({
        name : `${firstName} ${lastName}`,
        email: email,
        date: formattedDate,
        review
    })
    await book.save()
    res.status(200).json({status: httpStatusText.SUCCESS, data: {book}})
})

const addChangeUserBook = wrapAsync(async(req , res ,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new appError (errors.array(), 400, httpStatusText.FAIL));
    }
    let{bookName , status} = req.body;
    status = status.toUpperCase();
    const currentUser = req.currentUser;
    const user = await User.findById(currentUser.id);
    const bookId = await Book.findOne({name: bookName} , '_id')
    let ifBookExist = false;
    user.read.forEach(item => {
        if (item.book.equals(bookId._id)) {
            item.status = status;
            ifBookExist = true;
        }
    });
    try{
        if(!ifBookExist){
            user.read.push({book: bookId , status})
        }
        await user.save();
        res.status(200).json({status: httpStatusText.SUCCESS, message: "Status updated successfully"})
    }catch(err){
        next(new appError(err.message, 400 ,httpStatusText.FAIL))
    }
})

const rateUserBook = wrapAsync(async(req , res ,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new appError (errors.array(), 400, httpStatusText.FAIL));
    }
    let{bookName , rating} = req.body;
    const currentUser = req.currentUser;
    const user = await User.findById(currentUser.id);
    const bookId = await Book.findOne({name: bookName} , '_id')
    user.read.forEach(item => {
        if (item.book.equals(bookId._id)) {
            item.rating = rating;
        }
    });
    try{
        await user.save();
        res.status(200).json({status: httpStatusText.SUCCESS, message: "Rating added successfully"})
    }catch(err){
        next(new appError(err.message, 400 ,httpStatusText.FAIL))
    }
})

const getUserBooks = wrapAsync(async(req , res , next)=>{
    let {status} = req.body;
    const currentUser = req.currentUser;
    const user = await User.findById(currentUser.id);
    let books = [];
    if(!status){
        const bookPromises = user.read.map(async item => {
            let book = await Book.findById(item.book).populate({path: "author", select:"-_id firstName lastName"}).select('-_id rating name author image');
            book = book.toObject();
            book.status = item.status;
            book.userRate = item.rating;
            return book;
        });
        try {
             books = await Promise.all(bookPromises);
            res.status(200).json({status: httpStatusText.SUCCESS, data:{books}})
        } catch (err) {
            next(new appError(err.message , 400 , httpStatusText.FAIL))
        }
        
    }

    status = status.toUpperCase();
    const bookPromises = user.read.map(async item => {
            if(item.status === status){
                let book = await Book.findById(item.book).populate({path: "author", select:"-_id firstName lastName"}).select('-_id rating name author image');
                book = book.toObject();
                book.status = item.status;
                book.userRate = item.rating;
                return book;
            }          
        });
        try {
             books = await Promise.all(bookPromises);
             books = books.filter(book => book != null);
            res.status(200).json({status: httpStatusText.SUCCESS, data:{books}})
        } catch (err) {
            next(new appError(err.message , 400 , httpStatusText.FAIL))
        }

})

const deleteUserBook = wrapAsync(async(req , res ,next)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new appError (errors.array(), 400, httpStatusText.FAIL));
    }
    let{bookName} = req.body;
    const currentUser = req.currentUser;
    const user = await User.findById(currentUser.id);
    const bookId = await Book.findOne({name: bookName} , '_id')
    user.read.forEach(item => {
        if (item.book.equals(bookId._id)) {
            user.read.pull({ book: bookId._id });
        }
    });
    try{
        await user.save();
        res.status(200).json({status: httpStatusText.SUCCESS, message: "Book Deleted successfully"})
    }catch(err){
        next(new appError(err.message, 400 ,httpStatusText.FAIL))
    }
    

})

module.exports = {
    loginUser,
    createUser,
    getUser,
    addReview,
    addChangeUserBook,
    getUserBooks,
    deleteUserBook,
    rateUserBook
}