const { generateToken } = require("../lib/jwt/jwt");
const {
  findAdminByEmail,
  createAdmin,
  verifyPassword,
} = require("../service/admin.service");
const { errorResponse, successResponse } = require("../utils/response");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await findAdminByEmail(email);
    if (existing) {
      return errorResponse(res, 400, new Error("Email already registered"));
    }

    const admin = await createAdmin({ name, email, password });
    return successResponse(res, 201, "Admin registered successfully", {
      admin,
    });
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return errorResponse(res, 404, new Error("Admin not found"));
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
      return errorResponse(res, 401, new Error("Invalid credentials"));
    }

    const token = generateToken({ id: admin._id, email: admin.email });
    return successResponse(res, 200, "Login successful", { token });
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
