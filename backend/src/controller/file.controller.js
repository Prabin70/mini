const { uploadToCloudinary } = require("../uploads/multer");
const { successResponse, errorResponse } = require("../utils/response");
const path = require("path");

const singleFileController = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, "No file uploaded");
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const folder = [".mp4", ".mov", ".avi", ".mkv"].includes(ext)
      ? "videos"
      : "images";

    const result = await uploadToCloudinary(req.file.path, folder);

    successResponse(
      res,
      200,
      "File uploaded successfully",
      result,
      result.secure_url
    );
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

// Multiple file upload
const multipleFileController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 400, "No files uploaded");
    }

    const urls = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const folder = [".mp4", ".mov", ".avi", ".mkv"].includes(ext)
        ? "videos"
        : "images";

      const result = await uploadToCloudinary(file.path, folder);
      urls.push(result.secure_url);
    }

    successResponse(res, 200, "Files uploaded successfully", "urls", urls);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

module.exports = {
  singleFileController,
  multipleFileController,
};
