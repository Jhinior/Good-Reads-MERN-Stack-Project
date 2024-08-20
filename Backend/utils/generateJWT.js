const jwt = require("jsonwebtoken");

module.exports = async (paylioad) => {
  const token = await jwt.sign(paylioad, process.env.jwtTokenKey, {
    expiresIn: "1d",
  });
  return token;
};
