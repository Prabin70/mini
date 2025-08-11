const Enrollment = require("../model/enrollment.model");

const createEnrollment = async ({
  studentName,
  email,
  status,
  enrolledDate,
  course,
}) => {
  const response = await Enrollment.create({
    studentName,
    email,
    status,
    enrolledDate,
    course,
  });
  return response;
};

const fetchEnrollment = async ({ data }) => {
  const response = await Enrollment.find(data);
  return response;
};

const fetchEnrollmentById = async ({ id }) => {
  const response = await Enrollment.findById(id);
  return response;
};

const updateEnrollment = ({ id }) => {
  const response = Enrollment.findByIdAndUpdate(id);
  return response;
};

const deleteEnrollment = ({ id }) => {
  const response = Enrollment.findByIdAndDelete(id);
  return response;
};

module.exports = {
  createEnrollment,
  fetchEnrollment,
  fetchEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
