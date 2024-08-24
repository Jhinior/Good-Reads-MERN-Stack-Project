const wrapAsync = require("../utils/wrapAsync")
const httpStatusText = require("../utils/httpStatusText")
const Book = require("../models/book.model")
const appError = require("../utils/appError")
const idGenerator = require("../utils/idGenerator")
const Category = require('../models/category.model')
const Author = require('../models/author.model')


const getAllBooks = wrapAsync(async (req,res)=>{
    
    const books = await Book.find({},{"__v": false,"_id":false})
    .populate({path: "author",select:"_id id firstName lastName"})
    .populate({path: "category",select:"_id id name"})

    res.json({ status: httpStatusText.SUCCESS, data: {books}})
 })

const addBook = wrapAsync(async (req,res,next)=>{
    console.log(req.body)
    let {name, category, author} = req.body
    if (!name || !category || !author ) {
        return next(new appError('Please provide all the required fields', 400))
    }
    let newId = await idGenerator(Book)
    const book = new Book({
        id:newId,
        name,
        category,
        author,
        image:req.file.filename
    })
    await book.save()
    .then(()=>{
        res.status(201).json({status: httpStatusText.SUCCESS, data: {book}}) 
    })
    .catch((err)=>{
        if (err.code === 11000){
            return next(new appError(`Book ${book.name} already exists`, 400))
        }else{
            return next(new appError(`Book ${book.name} name is invalid`, 400))
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
    if(req.file){
        book.image = req.file.filename
    }
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
    console.log(id)
    const book = await Book.findOne({id})
    console.log(book)
    if (!book) {
        return next(new appError('Book not found', 404,httpStatusText.FAIL));
    }
    await book.deleteOne({id})
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
})


const getBooksByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId);
      const books = await Book.find({ 'category': category });
      res.json({ status: 'Success', data: { books } });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: error.message });
    }
  };

  const getBooksByAuthor = async (req, res, next) => {
    try {
      const { authorId } = req.params;
      const author = await Author.findById(authorId);
      const books = await Book.find({ 'author': author });
      res.json({ status: 'Success', data: { books } });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: error.message });
    }
  };

 module.exports = {
    getAllBooks,
    addBook,
    editBook,
    deleteBook,
    getBooksByCategory,
    getBooksByAuthor,
}




