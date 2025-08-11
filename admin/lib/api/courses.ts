import axios from "axios";
import baseUrl from "@/config/config";

export interface CourseDetails {
  title: string;
  description: string;
}

export interface CourseData {
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  courseVideo: string;
  instructor: string;
  courseDuration: string;
  coursePrice: number;
  courseDetails: CourseDetails[];
}

export const createCourse = async (formData: CourseData) => {
  try {
    const res = await axios.post(`${baseUrl}/courses`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getAllCourses = async () => {
  try {
    const res = await axios.get(`${baseUrl}/courses`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getCourseById = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/courses/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateCourse = async (id: string, formData: CourseData) => {
  try {
    const res = await axios.put(`${baseUrl}/courses/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/courses/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
