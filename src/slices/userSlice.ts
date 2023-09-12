import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {
  name: null,
  surname: null,
  dateOfBirth: null,
  email: null,
  phone: null,
  address: {
    details: "",
    city: "",
    country: "",
  },
  skills: [],
  experience: [],
  education: [],
  languages: [],
  profilePicture: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    addUserInfo: (state, action: PayloadAction<User | null>) => {
      Object.assign(state, action.payload);
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, addUserInfo } = userSlice.actions;
export default userSlice.reducer;
