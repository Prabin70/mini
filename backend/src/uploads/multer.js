const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { cloudName, apiKey, apiSecret } = require("../config/env");
const path = require("path");
const fs = require("fs");

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedImageExts = [".jpg", ".jpeg", ".png", ".gif", ".svg"];
  const allowedVideoExts = [".mp4", ".mov", ".avi", ".mkv"];

  if (allowedImageExts.includes(ext) || allowedVideoExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type! Only images and videos allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter,
});

const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { upload, uploadToCloudinary };
