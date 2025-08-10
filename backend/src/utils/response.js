exports.successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (res, statusCode, error) => {
  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};
