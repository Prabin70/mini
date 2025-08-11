import axios from "axios";
import baseUrl from "@/config/config";

export interface EnrollmentData {
  studentName: string;
  email: string;
  status?: "active" | "pending" | "inactive";
  enrollDate?: string;
  course: string;
}

export const createEnrollment = async (formData: EnrollmentData) => {
  try {
    const res = await axios.post(`${baseUrl}/enrollment`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.error("Create Enrollment Error:", error.message);
  }
};

export const getAllEnrollments = async () => {
  try {
    const res = await axios.get(`${baseUrl}/enrollment`);
    return res.data;
  } catch (error: any) {
    console.error("Get Enrollments Error:", error.message);
  }
};

export const updateEnrollmentStatus = async (
  enrollmentId: string,
  status: "active" | "pending" | "inactive"
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/enrollment/${enrollmentId}`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("Update Enrollment Error:", error.message);
  }
};
