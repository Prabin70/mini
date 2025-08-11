"use client";

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import baseUrl from "../../../config/env";

function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(`${baseUrl}/users/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log(token);
      // console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        toast.success("Signup successful! Redirecting to login...");

        setFormData({
          username: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: "Something went wrong. Please try again." });
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Sign up || E-learning</title>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-7 text-gray-800">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="your@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* General Errors */}
            {errors.general && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <span className="block sm:inline">{errors.general}</span>
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing Up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
