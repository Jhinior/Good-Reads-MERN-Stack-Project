const { body } = require("express-validator");

const addCategoryValidation = ()=>{
    return[
        body("name")
        .isString()
        .withMessage("category Name must consiste of characters only")
        .notEmpty()
        .withMessage("category name is required")
        .isLength({ min: 4 })
        .withMessage("category name length 4 char at least"),
    ]
}



module.exports = {
    addCategoryValidation
}