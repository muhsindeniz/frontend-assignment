import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RegisterEmployeeState, RegisterState } from "./types";
import { UserType } from "~/pages/register/types";

const initialState: RegisterEmployeeState = {
  name: null,
  surname: null,
  email: null,
  phone: null,
  role: UserType.EMPLOYER,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<Partial<RegisterState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setPersonalInfo } = registerSlice.actions;

export default registerSlice.reducer;
