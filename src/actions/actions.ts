import { axiosInstance } from "@/utils/axios";
import axios from "axios";

// Sample Code with axios

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await axiosInstance.post(`/api/auth/login`, {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw error.response?.data || new Error("Failed to Login");
//     }
//     throw error;
//   }
// };

// Get Doctor's Patients
export const getDoctorPatients = async (doctor_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/doctors/${doctor_id}/patients_web`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || new Error("Error getting doctor's patients")
      );
    }
    throw error;
  }
};
