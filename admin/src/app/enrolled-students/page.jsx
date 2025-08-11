"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/env";
import { CheckCircle2, Trash2, Edit2 } from "lucide-react";

import { BiSolidEdit } from "react-icons/bi";

const Avatar = ({ name }) => {
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";
    const names = name.trim().split(" ");
    if (names.length === 0 || names[0] === "") return "?";
    const initials =
      names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`
        : names[0][0];
    return initials.toUpperCase();
  };

  return (
    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 font-bold text-lg border border-gray-600">
      {getInitials(name)}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const lowerCaseStatus = status ? status.toLowerCase() : "unknown";
  let colors = "bg-gray-700 text-gray-300";

  switch (lowerCaseStatus) {
    case "completed":
      colors = "bg-green-500/20 text-green-300";
      break;
    case "active":
    case "in-progress":
      colors = "bg-blue-500/20 text-blue-300";
      break;
    case "pending":
      colors = "bg-yellow-500/20 text-yellow-300";
      break;
    case "cancelled":
      colors = "bg-red-500/20 text-red-300";
      break;
    default:
      break;
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${colors}`}
    >
      {status || "Unknown"}
    </span>
  );
};

const EnrolledStudents = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For simple inline editing state:
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    studentName: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/enrollment`);
        setEnrollments(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch enrollments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const handleUpdateStudents = async (id) => {
    try {
      setEnrollments((prevEnrollments) =>
        prevEnrollments.map((enrollment) =>
          enrollment._id === id
            ? { ...enrollment, status: "active" }
            : enrollment
        )
      );
      await axios.put(`${baseUrl}/enrollment/${id}`, { status: "active" });
    } catch (error) {
      console.error("Failed to update enrollment:", error);
      setError("Could not update the student's status. Please try again.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this enrollment? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`${baseUrl}/enrollment/${id}`);
        setEnrollments((prevEnrollments) =>
          prevEnrollments.filter((enrollment) => enrollment._id !== id)
        );
      } catch (error) {
        console.error("Failed to delete enrollment:", error);
        setError("Could not delete the enrollment. Please try again.");
      }
    }
  };

  const startEditing = (enrollment) => {
    setEditingId(enrollment._id);
    setEditFormData({
      studentName: enrollment.studentName || "",
      email: enrollment.email || "",
      status: enrollment.status || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({ studentName: "", email: "", status: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${baseUrl}/enrollment/${id}`, editFormData);
      setEnrollments((prevEnrollments) =>
        prevEnrollments.map((enrollment) =>
          enrollment._id === id
            ? { ...enrollment, ...editFormData }
            : enrollment
        )
      );
      cancelEditing();
    } catch (error) {
      console.error("Failed to save enrollment edit:", error);
      setError("Could not save changes. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400">Loading enrolled students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div
          className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            Enrolled Students
          </h1>
          <p className="mt-2 text-base text-gray-400">
            A list of all students currently enrolled in courses.
          </p>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-700">
          <ul role="list" className="divide-y divide-gray-700">
            {enrollments.length === 0 ? (
              <li className="text-center py-12 text-gray-500">
                No enrollments found.
              </li>
            ) : (
              enrollments.map((enroll) => (
                <li
                  key={enroll._id}
                  className="p-4 sm:p-5 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between space-x-4">
                    {/* Left side: Avatar and Info */}
                    <div className="flex items-center space-x-4 min-w-0">
                      <Avatar name={enroll.studentName} />
                      <div className="flex-1 min-w-0">
                        {editingId === enroll._id ? (
                          <>
                            <input
                              name="studentName"
                              value={editFormData.studentName}
                              onChange={handleEditChange}
                              className="w-full rounded-md px-2 py-1 text-black"
                            />
                            <input
                              name="email"
                              type="email"
                              value={editFormData.email}
                              onChange={handleEditChange}
                              className="w-full rounded-md px-2 py-1 mt-1 text-black"
                            />
                            <select
                              name="status"
                              value={editFormData.status}
                              onChange={handleEditChange}
                              className="w-full rounded-md px-2 py-1 mt-1 text-black"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </>
                        ) : (
                          <>
                            <p className="text-base font-semibold text-gray-100 truncate">
                              {enroll.studentName || "Unnamed Student"}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                              {enroll.email}
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                              {enroll.course?.courseTitle || "Unknown Course"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="flex items-center space-x-3">
                        {enroll.status.toLowerCase() === "pending" &&
                          editingId !== enroll._id && (
                            <button
                              onClick={() => handleUpdateStudents(enroll._id)}
                              title="Approve Enrollment"
                              className="text-gray-500 hover:text-green-400 transition-colors duration-200"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </button>
                          )}

                        {editingId === enroll._id ? (
                          <>
                            <button
                              onClick={() => saveEdit(enroll._id)}
                              title="Save Changes"
                              className="text-blue-400 hover:text-blue-600 transition-colors duration-200 mr-2"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              title="Cancel Edit"
                              className="text-gray-500 hover:text-red-400 transition-colors duration-200"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(enroll)}
                              title="Edit Enrollment"
                              className="text-gray-500 hover:text-gray-100 cursor-pointer transition-colors duration-200"
                            >
                              <BiSolidEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(enroll._id)}
                              title="Delete Enrollment"
                              className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-200"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2 text-right">
                        <StatusBadge status={enroll.status} />
                        <p className="text-xs text-gray-500">
                          {new Date(enroll.enrollDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudents;
