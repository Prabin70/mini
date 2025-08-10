const { hashPassword, comparePassword } = require("../lib/bcrypt/bcrypt");
const Admin = require("../model/admin.model");

const createAdmin = async (data) => {
  const hashedPassword = await hashPassword(data.password);
  const adminData = {
    ...data,
    password: hashedPassword,
    role: "admin",
  };
  return await Admin.create(adminData);
};

const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

const verifyPassword = async (enteredPassword, hashedPassword) => {
  return await comparePassword(enteredPassword, hashedPassword);
};

module.exports = {
  createAdmin,
  findAdminByEmail,
  verifyPassword,
};
