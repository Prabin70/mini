const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../service/course.service");
const { successResponse, errorResponse } = require("../utils/response");

const createCourseController = async (req, res, next) => {
  try {
    const courseData = req.body;
    const response = await createCourse(courseData);
    successResponse(res, 201, "Course created successfully", response);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

const getAllCourseController = async (req, res, next) => {
  try {
    const response = await getAllCourses();
    successResponse(res, 200, "Courses fetched successfully", response);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

const getCourseByIdController = async (req, res, next) => {
  try {
    const response = await getCourseById(req.params.id);
    successResponse(res, 200, "Course fetched successfully", response);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

const updateCourseController = async (req, res, next) => {
  try {
    const response = await updateCourse(req.params.id, req.body);
    successResponse(res, 200, "Course updated successfully", response);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

const deleteCourseController = async (req, res, next) => {
  try {
    const response = await deleteCourse(req.params.id);
    successResponse(res, 200, "Course deleted successfully", response);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

module.exports = {
  createCourseController,
  getAllCourseController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
};
