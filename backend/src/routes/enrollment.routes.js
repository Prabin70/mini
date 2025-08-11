const express = require("express");
const {
  createEnrollmentController,
  getAllEnrollment,
  getEnrollmentById,
  updateEnrollmentController,
  deleteEnrollmentController,
} = require("../controller/enrollment.controller");

const enrollmentRouter = express.Router();

enrollmentRouter.post("/", createEnrollmentController);
enrollmentRouter.get("/", getAllEnrollment);
enrollmentRouter.get("/:id", getEnrollmentById);
enrollmentRouter.put("/:id", updateEnrollmentController);
enrollmentRouter.delete("/:id", deleteEnrollmentController);

module.exports = enrollmentRouter;
