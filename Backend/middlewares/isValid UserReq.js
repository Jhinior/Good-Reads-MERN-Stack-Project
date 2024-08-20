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



module.exports = {
    loginValidation
}