const multer = require("multer");
const path = require("path");

const limits = {
  fileSize: 1024 * 1024 * 2, // 2MB
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const staticFolder = "./public";
    cb(null, staticFolder);
  },

  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const validExtension = [
    ".png",
    ".PNG",
    ".jpg",
    ".JPG",
    ".pdf",
    ".jpeg",
    ".JPEG",
    ".mp4",
    ".svg",
    ".doc",
    ".docx",
  ];

  const originalExtension = path.extname(file.originalname);
  const isValidExtension = validExtension.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"));
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
