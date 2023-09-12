import axios from "axios";
import jwt from "jsonwebtoken";
import { useAppSelector } from "~/hooks/hooks";
import { LoginState, LoginResponse } from "~/slices/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "https://645e4f8b12e0a87ac0ed1b2d.mockapi.io";
const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "70be147e328bf9a70229d79b4ca37d7358c373f3d3c471f577dba74e0c4d15b1a2a38a205a3e5f19a99d0e0e2db11235f4c82f7353a51f58a6da9f1c0e47457f";

export const loginUser = async (
  userData: LoginState,
): Promise<LoginResponse> => {
  try {
    if (
      userData.email == "mnknsro413@gmail.com" &&
      userData.password == "123"
    ) {
      const response = await axios.get(`${BASE_URL}/users/1`);
      return {
        success: true,
        message: "Giriş başarılı.",
        user: response.data,
      };
    } else {
      throw new Error("Giriş başarısız!");
    }
  } catch (error: any) {
    let errorMessage = error.message;
    if (error.response && error.response.data) {
      errorMessage =
        error.response.data.message || "Network response was not ok";
    }
    return {
      success: false,
      message: errorMessage,
      user: null,
      token: null,
    };
  }
};
