import { UserType } from "~/pages/register/types";

export interface Address {
  details: string;
  city: string;
  country: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface RegisterState {
  name: string | null;
  surname: string | null;
  dateOfBirth: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
  skills: string[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  profilePicture: string | null;
  role: UserType.JOB_SEEKER;
}

export interface RegisterEmployeeState {
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  role: UserType.EMPLOYER;
}

export interface User {
  name: string | null;
  surname: string | null;
  dateOfBirth: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
  skills: string[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  profilePicture: string | null;
  isLoggedIn: boolean;
}

export interface LoginState {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string | null;
  message?: string | null;
  user: User | null;
}
