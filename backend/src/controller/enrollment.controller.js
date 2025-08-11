const {
  createEnrollment,
  deleteEnrollment,
  fetchEnrollment,
  fetchEnrollmentById,
  updateEnrollment,
} = require("../service/enrollment.service");
const { errorResponse, successResponse } = require("../utils/response");

const createEnrollmentController = async (req, res, next) => {
  try {
    const data = req.body;

    const response = await createEnrollment(data);

    successResponse(res, 200, "Enrollment created successfully", response);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const getAllEnrollment = async (req, res, next) => {
  try {
    const response = await fetchEnrollment();
    successResponse(res, 200, "Enrollment fetched successfully", response);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const getEnrollmentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetchEnrollmentById(id);
    successResponse(res, 200, "Enrollment fetched successfully", response);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const updateEnrollmentController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await updateEnrollment(id, data, { new: true });
    successResponse(res, 200, "Enrollment updated successfully", response);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const deleteEnrollmentController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await deleteEnrollment(id);
    successResponse(res, 200, "Enrollment deleted successfully", response);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createEnrollmentController,
  getAllEnrollment,
  getEnrollmentById,
  updateEnrollmentController,
  deleteEnrollmentController,
};
