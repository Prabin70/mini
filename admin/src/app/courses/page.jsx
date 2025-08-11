"use client";

import baseUrl from "@/config/env";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  FiPlus,
  FiX,
  FiTrash2,
  FiUploadCloud,
  FiMoreVertical,
} from "react-icons/fi";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
        className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    )}
  </div>
);

const DropzoneField = ({ onDrop, file, label }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"], "video/*": [".mp4", ".mov"] },
    maxFiles: 1,
  });
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive
            ? "border-purple-500 bg-gray-700"
            : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
        }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
        {file ? (
          <p className="text-sm text-green-400">{file.name}</p>
        ) : (
          <p className="text-sm text-gray-400">
            Drag & drop file here, or click to select
          </p>
        )}
      </div>
    </div>
  );
};

const AddCourseModal = ({ isOpen, onClose, onCourseAdded }) => {
  const initialFormState = {
    courseTitle: "",
    courseDescription: "",
    instructor: "",
    courseDuration: "",
    coursePrice: "",
    courseImage: null,
    courseVideo: null,
    courseDetails: [{ title: "", description: "" }],
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onImageDrop = useCallback(
    (acceptedFiles) =>
      setFormData((prev) => ({ ...prev, courseImage: acceptedFiles[0] })),
    []
  );
  const onVideoDrop = useCallback(
    (acceptedFiles) =>
      setFormData((prev) => ({ ...prev, courseVideo: acceptedFiles[0] })),
    []
  );

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleDetailChange = (index, e) => {
    const newDetails = formData.courseDetails.map((detail, i) =>
      i === index ? { ...detail, [e.target.name]: e.target.value } : detail
    );
    setFormData((prev) => ({ ...prev, courseDetails: newDetails }));
  };
  const handleAddDetail = () =>
    setFormData((prev) => ({
      ...prev,
      courseDetails: [...prev.courseDetails, { title: "", description: "" }],
    }));
  const handleRemoveDetail = (index) =>
    setFormData((prev) => ({
      ...prev,
      courseDetails: prev.courseDetails.filter((_, i) => i !== index),
    }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      let videoUrl = "";

      if (formData.courseImage) {
        const imageFormData = new FormData();
        imageFormData.append("document", formData.courseImage);
        const imageRes = await axios.post(
          `${baseUrl}/file/single`,
          imageFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = imageRes.data.data.url;
      }

      if (formData.courseVideo) {
        const videoFormData = new FormData();
        videoFormData.append("document", formData.courseVideo);
        const videoRes = await axios.post(
          `${baseUrl}/file/single`,
          videoFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        videoUrl = videoRes.data.data.url;
      }

      const coursePayload = {
        ...formData,
        courseImage: imageUrl,
        courseVideo: videoUrl,
      };

      console.log(coursePayload);

      const course = await axios.post(`${baseUrl}/courses`, coursePayload);

      // console.log(course.data.courseImage);

      onCourseAdded();
      setFormData(initialFormState);
      onClose();
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Error: Could not add the course. Please check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Add New Course</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <FiX size={20} />
          </button>
        </header>
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          <InputField
            label="Course Title"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            id="courseTitle"
            placeholder="e.g., Modern React with Hooks"
          />
          <InputField
            label="Course Description"
            name="courseDescription"
            id="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            placeholder="A brief summary of the course..."
            type="textarea"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Instructor Name"
              name="instructor"
              id="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="e.g., John Doe"
            />
            <InputField
              label="Course Duration"
              name="courseDuration"
              id="courseDuration"
              value={formData.courseDuration}
              onChange={handleChange}
              placeholder="e.g., 8 hours"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropzoneField
              onDrop={onImageDrop}
              file={formData.courseImage}
              label="Course Image"
            />
            <DropzoneField
              onDrop={onVideoDrop}
              file={formData.courseVideo}
              label="Course Video"
            />
          </div>
          <InputField
            label="Course Price ($)"
            name="coursePrice"
            id="coursePrice"
            value={formData.coursePrice}
            onChange={handleChange}
            placeholder="e.g., 49.99"
            type="number"
          />
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Course Chapters
            </h3>
            {formData.courseDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 mb-3 bg-gray-700/50 rounded-lg"
              >
                <span className="mt-2 text-sm font-bold text-gray-400">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-3">
                  <InputField
                    label="Chapter Title"
                    name="title"
                    id="title"
                    value={detail.title}
                    onChange={(e) => handleDetailChange(index, e)}
                    placeholder="Chapter Title"
                  />
                  <InputField
                    label="Chapter Description"
                    name="description"
                    id="description"
                    value={detail.description}
                    onChange={(e) => handleDetailChange(index, e)}
                    placeholder="What this chapter covers..."
                    type="textarea"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors mt-8"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetail}
              className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 text-sm text-purple-300 border-2 border-dashed border-gray-600 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all"
            >
              <FiPlus size={16} /> Add Another Chapter
            </button>
          </div>
        </form>
        <footer className="flex justify-end p-5 border-t border-gray-700">
          <button
            onClick={onClose}
            type="button"
            disabled={isSubmitting}
            className="px-5 py-2 mr-3 text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Add Course"}
          </button>
        </footer>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/courses`);
      // console.log(res.data.data);
      setCourses(res.data.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setError("Could not load courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${baseUrl}/courses/${courseId}`);
        setCourses((prev) => prev.filter((course) => course._id !== courseId)); // Use _id if coming from MongoDB
      } catch (error) {
        console.error("Failed to delete course:", error);
        alert("Error: Could not delete the course.");
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Courses</h1>
            <p className="text-gray-400 mt-1">
              Manage and organize your educational content.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300"
          >
            <FiPlus size={18} />
            <span>Add Course</span>
          </button>
        </header>

        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                    Course
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                    Instructor
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                    Price
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      Loading courses...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-red-400">
                      {error}
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No courses found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={
                            course.courseImage ||
                            "https://placehold.co/100x100/1f2937/7c3aed?text=Img"
                          }
                          alt={course.courseTitle}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                        <span className="font-medium text-white">
                          {course.courseTitle}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">{course.instructor}</td>
                      <td className="p-4 font-medium text-purple-400">
                        ${course.coursePrice}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            course.status === "Published"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {course.status || "Draft"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-500/10"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCourseAdded={fetchCourses}
      />
    </div>
  );
};

export default CoursesPage;
