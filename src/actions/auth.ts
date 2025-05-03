import { axiosInstance } from "@/utils/axios";
import axios from "axios";

export const login = async (
  username: string,
  password: string,
  web_push_token: string
) => {
  try {
    const response = await axiosInstance.post(`/api/register_doctor_web`, {
      username,
      password,
      web_push_token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to Login");
    }
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(`/api/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to Register");
    }
    throw error;
  }
};

export const resendOTP = async (email: string) => {
  try {
    const response = await axiosInstance.post(`/api/auth/resend-otp`, {
      email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to Resend OTP");
    }
    throw error;
  }
};
