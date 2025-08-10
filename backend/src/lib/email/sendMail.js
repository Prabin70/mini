const nodemailer = require("nodemailer");
const { email, password } = require("../../config/env");

const transportInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
};

const sendEmail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transportInfo);
    const info = await transporter.sendMail(mailInfo);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending error:", error.message);
  }
};

module.exports = { sendEmail };
