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

export const getPatientById = async (patient_id: string) => {
  try {
    const response = await axiosInstance.get(`/api/patients/${patient_id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Error fetching Patient data");
    }
    throw error;
  }
};

export const getImagesPatientById = async (patient_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/patients/${patient_id}/images`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || new Error("Error fetching Patient Images data")
      );
    }
    throw error;
  }
};

export const getPrognosisById = async (patient_id: string) => {
  try {
    const response = await axiosInstance.get(`/api/prognosis/${patient_id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data ||
        new Error("Error fetching Patient Prognosis data")
      );
    }
    throw error;
  }
};

export const getLLMReport = async (patient_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/prognosis_report/${patient_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data ||
        new Error("Error fetching Patient Prognosis Report data")
      );
    }
    throw error;
  }
};
