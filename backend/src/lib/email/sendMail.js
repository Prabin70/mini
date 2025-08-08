const nodemailer = require("nodemailer");

const transportInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "prabin.shresthadev77@gmail.com",
    pass: "juik cqqd mmwk zupm", // Consider moving this to environment variables for security
  },
};

const sendEmail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transportInfo);
    const info = await transporter.sendMail(mailInfo);
    console.log("Email sent:", info.messageId); // Optional log
  } catch (error) {
    console.error("Email sending error:", error.message);
  }
};

module.exports = { sendEmail };
