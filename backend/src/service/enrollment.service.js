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

const fetchEnrollment = async () => {
  return await Enrollment.find().populate("course", "courseTitle").exec();
};

const fetchEnrollmentById = async (id) => {
  return await Enrollment.findById(id).populate("course", "courseTitle");
};
const updateEnrollment = (id, data) => {
  const response = Enrollment.findByIdAndUpdate(id, data, { new: true });
  return response;
};

const deleteEnrollment = (id) => {
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
