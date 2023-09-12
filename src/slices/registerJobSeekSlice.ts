import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Education, Experience, Language, RegisterState, User } from "./types";
import { UserType } from "~/pages/register/types";

const initialState: RegisterState = {
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
  role: UserType.JOB_SEEKER,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<Partial<RegisterState>>) => {
      Object.assign(state, action.payload);
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.push(action.payload);
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
  },
});

export const {
  setPersonalInfo,
  addExperience,
  addEducation,
  addLanguage,
  setSkills,
} = registerSlice.actions;

export default registerSlice.reducer;
