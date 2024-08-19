const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");


const verifyToken = (req, res, next) => {
   const token = req.cookies.token; 
  if(!token){
    return next(new appError("unauthorized action", 401, httpStatusText.FAIL))
  }
  try {
    const currentUser = jwt.verify(token, process.env.jwtTokenKey);
    console.log(currentUser);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    return next(new appError("unauthorized: invalid token", 401, httpStatusText.FAIL))
  }
};

module.exports = verifyToken;
