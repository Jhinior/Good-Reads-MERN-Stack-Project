const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const bookController = require("../controllers/book.controller")
const authorController = require("../controllers/author.controller")
const categoryController = require("../controllers/category.controller")
const isValidCategReq = require("../middlewares/isValiedCategRequest")
const Category = require("../models/category.model")
const verifyToken = require("../middlewares/verifytoken");
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/users.roles");
const multer = require("multer")
const appError = require("../utils/appError")
const upload = require("../middlewares/imageUpLoader")


router.post("/register",adminController.createAdmin)

router.post("/login",adminController.loginAdmin)

router.patch("/:username/edit",verifyToken,adminController.editAdmin)

router.get("/book",bookController.getAllBooks)

router.post("/book/add",verifyToken,upload.single("image"),allowedTo(userRoles.ADMIN),bookController.addBook)

router.patch("/book/:id/edit",verifyToken,upload.single("image"),bookController.editBook)

router.delete("/book/:id/delete",bookController.deleteBook)
 
router.get("/author",authorController.getAllAuthors)

router.get("/author/:id",authorController.getOneAuthor)

router.post("/author/add",verifyToken,upload.single("image"),authorController.addAuthor)

router.patch("/author/:id/edit",verifyToken,upload.single("image"),authorController.editAuthor)

router.delete("/author/:id/delete",authorController.deleteAuthor)

router.get("/category", categoryController.getCategory);

router.post( "/category/add", isValidCategReq.addCategoryValidation() , categoryController.addCategory);

router.patch("/category/:id/edit" , isValidCategReq.addCategoryValidation() , categoryController.updateCategory)

router.delete("/category/:id/delete" , categoryController.deleteCategory)

router.get('/categories/name/:name', categoryController.getCategoryByName)

router.get('/books/category/:categoryId', bookController.getBooksByCategory)

router.get('/author/name/:name', authorController.getAuthorByName)

router.get('/books/author/:authorId', bookController.getBooksByAuthor)

module.exports = router;
