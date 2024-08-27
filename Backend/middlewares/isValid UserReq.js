const { body } = require("express-validator");

const loginValidation = ()=>{
    return[
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isString()
        .withMessage("Invaild email")
        .isEmail()
        .withMessage("Invalid Email"),
        

        body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Invalid Password")
    ]
}

const addChangeUserBookValid = ()=>{
    return[
        body("bookName")
        .notEmpty()
        .withMessage("Book name is required")
        .isString()
        .withMessage("Book name must be string"),

        body("status")
        .notEmpty()
        .withMessage("status is requiired")
        .isString()
        .withMessage("status must be String")
    ]
}

const deleteUserBookValid = ()=>{
    return[
        body("bookName")
        .notEmpty()
        .withMessage("Book name is required")
        .isString()
        .withMessage("Book name must be string"),
    ]
}

const rateUserBookValid = ()=>{
    return[
        body("bookName")
        .notEmpty()
        .withMessage("Book name is required")
        .isString()
        .withMessage("Book name must be string"),

        body("rating")
        .notEmpty()
        .withMessage("status is required")
        .isInt({ min: 1, max: 5 }) 
        .withMessage('Rating must be a number between 1 and 5')
    ]
}



module.exports = {
    loginValidation,
    addChangeUserBookValid,
    deleteUserBookValid,
    rateUserBookValid
}