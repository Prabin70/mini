"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import baseUrl from "../../../config/env";
import { DollarSign, Clock } from "lucide-react";

const CourseDetailPage = ({ params }) => {
  const id = params.slug;
  console.log(id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <section className="py-10  bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:flex gap-8">
        {/* Left: Video */}
        <div className="lg:w-2/5 bg-white rounded-2xl shadow-md overflow-hidden mb-6 lg:mb-0">
          <video
            src={`${baseUrl}/${course.courseVideo}`}
            controls
            className="w-full h-64 lg:h-[400px] object-cover"
          />
        </div>

        {/* Right: Course Details */}
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

          {/* Enroll Now Button */}
          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold
                       hover:bg-green-700 transition duration-200 shadow-md"
          >
            Enroll Now
          </button>

          {/* Detailed Lessons */}
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
    </section>
  );
};

export default CourseDetailPage;
