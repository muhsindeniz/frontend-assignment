import axios from "axios";
import { RegisterState } from "~/slices/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";

export const createUser = async (userData: RegisterState) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Network response was not ok",
      );
    }
    throw new Error("An unknown error occurred");
  }
};
