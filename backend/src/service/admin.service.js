const jwt = require("jsonwebtoken");

const hardcodedEmail = "admin@gmail.com";
const hardcodedPassword = "admin123";

const adminLoginService = async (email, password) => {
  if (email === hardcodedEmail && password === hardcodedPassword) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { success: true, token };
  }
  return { success: false };
};

module.exports = { adminLoginService };
