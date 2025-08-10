const express = require("express");
const {
  multipleFileController,
  singleFileController,
} = require("../controller/file.controller");
const { upload } = require("../uploads/multer");

const fileRouter = express.Router();

fileRouter
  .route("/single")
  .post(upload.single("document"), singleFileController);

fileRouter
  .route("/multiple")
  .post(upload.array("document"), multipleFileController);

module.exports = fileRouter;
