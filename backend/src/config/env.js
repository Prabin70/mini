const { config } = require("dotenv");

config();

const port = process.env.PORT || 9000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/myusers";
const env = process.env.NODE_ENV || "development";

const jwtSecret = process.env.JWT_SECRET || "secret";

module.exports = {
  port,
  mongoUri,
  env,
  jwtSecret,
};
