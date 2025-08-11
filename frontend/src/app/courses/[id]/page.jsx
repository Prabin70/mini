"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config/env";
import { DollarSign, Clock, X } from "lucide-react";
import { useParams } from "next/navigation";

const buildUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}/${path}`.replace(/([^:]\/)\/+/g, "$1");
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${baseUrl}/courses/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        setCourse(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error.message);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/enrollment`, {
        studentName: formData.studentName,
        email: formData.email,
        course: id,
      });
      console.log(res);
      alert("Enrollment successful!");
      setShowEnrollForm(false);
      setFormData({ studentName: "", email: "" });
    } catch (error) {
      console.error("Error enrolling:", error.message);
      alert("Failed to enroll. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg">
        Course not found!
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen relative">
      <div className="container mx-auto px-4 lg:flex gap-8">
        <div className="lg:w-2/5 bg-white rounded-2xl shadow-md overflow-hidden mb-6 lg:mb-0">
          <video
            src={buildUrl(course.courseVideo)}
            controls
            className="w-full h-64 lg:h-[400px] object-cover"
          />
        </div>

        <div className="lg:w-3/5 bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {course.courseTitle}
          </h1>
          <p className="text-gray-600 mb-5">{course.courseDescription}</p>

          <div className="flex items-center gap-6 text-gray-700 mb-6">
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-green-500" />
              <span>{course.courseDuration}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-green-600">
              <DollarSign className="h-5 w-5" />
              <span>{course.coursePrice}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isLoggedIn) {
                alert("Please login first to enroll!");
                window.location.href = "/auth/login";
              } else {
                setShowEnrollForm(true);
              }
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
          >
            Enroll Now
          </button>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Course Lessons
            </h2>
            <div className="space-y-4">
              {course.courseDetails?.map((lesson) => (
                <div
                  key={lesson._id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEnrollForm && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setShowEnrollForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Enroll in Course</h2>
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseDetailPage;
