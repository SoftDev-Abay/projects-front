import { axiosInstance } from "../api/axios";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance("http://localhost:5555/users");

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
