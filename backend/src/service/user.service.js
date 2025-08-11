const { hashPassword, comparePassword } = require("../lib/bcrypt/bcrypt");
const { sendEmail } = require("../lib/email/sendMail");
const {
  verificationMailTemplate,
} = require("../lib/email/verificationMailTemplate");
const { generateRandomCode } = require("../lib/generateToken");
const { generateToken } = require("../lib/jwt/jwt");
const UserModel = require("../model/user.model");

const registerUser = async ({ username, email, password }) => {
  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const code = generateRandomCode();

  const user = await UserModel.create({
    username,
    email,
    password: hashed,
    verificationCode: code,
  });
  const token = generateToken({ id: user.id, email: user.email });

  await sendEmail({
    to: email,
    subject: "Verify your email address",
    html: verificationMailTemplate(username, email, code, token),
  });

  return { user, token };
};

const verifyUserCode = async ({ email, code }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.verificationCode !== code) throw new Error("Invalid code");

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  return { message: "Email verified successfully", user };
};

const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  if (!user.isVerified) throw new Error("Please verify your email first");

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      token,
    },
  };
};

module.exports = {
  registerUser,
  verifyUserCode,
  loginUser,
};
