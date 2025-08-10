const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
};
