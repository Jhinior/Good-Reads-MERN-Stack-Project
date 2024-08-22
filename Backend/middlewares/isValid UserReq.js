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



module.exports = {
    loginValidation,
    addChangeUserBookValid
}