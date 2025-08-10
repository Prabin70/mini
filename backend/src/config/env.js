const { config } = require("dotenv");

config();


const port = process.env.PORT;

const mongoURI = process.env.MONGO_URI;

const jwtSecret = process.env.JWT_SECRET;

const email = process.env.EMAIL;

const password = process.env.APP_PASSWORD;

const adminEmail = process.env.ADMIN_EMAIL;

const adminPassword = process.env.ADMIN_PASSWORD;

const apiSecret = process.env.API_SECRET;
const apiKey = process.env.API_KEY;
const cloudName = process.env.CLOUD_NAME;
const couldinaryUrl = process.env.CLOUDINARY_URL;

module.exports = {
  port,
  mongoURI,
  jwtSecret,
  email,
  password,
  adminEmail,
  adminPassword,
  apiSecret,
  apiKey,
  cloudName,
  couldinaryUrl,
};
