const express = require("express");

const {
  createCourseController,
  getAllCourseController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} = require("../controller/course.controller");

const courseRouter = express.Router();

courseRouter.post("/", createCourseController);
courseRouter.get("/", getAllCourseController);
courseRouter.get("/:id", getCourseByIdController);
courseRouter.put("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

module.exports = courseRouter;
