const wrapAsync = require("../utils/wrapAsync")
const httpStatusText = require("../utils/httpStatusText")
const Book = require("../models/book.model")
const appError = require("../utils/appError")
const idGenerator = require("../utils/idGenerator")


const getAllBooks = wrapAsync(async (req,res)=>{
    
    const books = await Book.find({},{"__v": false,"_id":false})
    .populate({path: "author",select:"-_id id firstName lastName"})
    .populate({path: "category",select:"-_id id name"})

    res.json({ status: httpStatusText.SUCCESS, data: {books}})
 })

const addBook = wrapAsync(async (req,res,next)=>{
    let {name, category, author, image,} = req.body
    if (!name || !category || !author ) {
        return next(new appError('Please provide all the required fields', 400))
    }
    let newId = await idGenerator(Book)
    const book = new Book({
        id:newId,
        name,
        category,
        author,
        image
    })
    await book.save()
    .then(()=>{
        res.status(201).json({status: httpStatusText.SUCCESS, data: {book}}) 
    })
    .catch((err)=>{
        if (err.code === 11000){
            return next(new appError(`Book ${book.name} already exists`, 400))
        }
        next(err)
    })
})

const editBook = wrapAsync(async (req,res,next)=>{
    const id = req.params.id
    let book = await Book.findOne({id})
    if (!book) {
        return next(new appError('Book not found', 404));
    }
    Object.assign(book, req.body);
    await book.save()
    .then(()=>{
        res.status(201).json({status: httpStatusText.SUCCESS, data: {book}}) 
    })
    .catch((err)=>{
        if (err.code === 11000){
            return next(new appError(`Book ${book.name} already exists`, 400))
        }
    })
})

const deleteBook = wrapAsync(async (req,res,next)=>{
    const id = req.params.id
    const book = await Book.findOne({id})
    if (!book) {
        return next(new appError('Book not found', 404,httpStatusText.FAIL));
    }
    await book.deleteOne({id})
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
})

 module.exports = {
    getAllBooks,
    addBook,
    editBook,
    deleteBook
}




