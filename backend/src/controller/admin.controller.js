const { adminLoginService } = require("../service/admin.service");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await adminLoginService(email, password);

    if (result.success) {
      return res.status(200).json({
        success: true,
        token: result.token,
        message: "Login successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = { adminLogin };
