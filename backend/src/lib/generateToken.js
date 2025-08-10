const crypto = require("crypto");

exports.generateRandomCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};
