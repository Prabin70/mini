const {
  loginUser,
  registerUser,
  verifyUserCode,
} = require("../service/user.service");
const { successResponse, errorResponse } = require("../utils/response");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser({
      username,
      email,
      password,
    });

    successResponse(
      res,
      201,
      "User registered, check your email for verification code",
      { user }
    );
  } catch (err) {
    errorResponse(res, 400, err);
  }
};

exports.verifyThroughLink = async (req, res, next) => {
  try {
    const { email, code } = req.query;
    const result = await verifyUserCode({ email, code });
    successResponse(res, 200, "User verified successfully", result);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user } = await loginUser({ email, password });
    console.log(user);

    if (!user.isVerified) {
      return errorResponse(
        res,
        403,
        new Error("Please verify your email first.")
      );
    }

    res.status(200).json({
      success: true,
      message: "Login successfull",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        token: user.token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
