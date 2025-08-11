"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, User, DollarSign } from "lucide-react";
import axios from "axios";
import baseUrl from "../../config/env";
import Link from "next/link";

const CourseSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(`${baseUrl}/courses`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCourses(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Explore Our Courses
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Unlock your potential with our expert-led online courses. From web
          development to data science, we have something for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden
                         hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <img
                src={`${baseUrl}/${course.courseImage}`}
                alt={course.courseTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.courseTitle}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.courseDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-green-500" />
                    <span>{course.courseDuration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{course.coursePrice}</span>
                  </div>
                </div>

                <Link
                  href={`/courses/${course._id}`}
                  className="block w-full text-center bg-green-600 text-white py-2.5 rounded-md
                             font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  View Course
                  <BookOpen className="inline-block ml-2 h-5 w-5 -mt-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
