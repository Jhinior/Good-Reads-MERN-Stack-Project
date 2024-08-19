const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

module.exports = (role)=>{
    return (req , res , next)=>{
        if(role != req.currentUser.role){
            return next(new appError("unauthorized access to admin operation", 401, httpStatusText.FAIL));
        }
        next();
    }
}