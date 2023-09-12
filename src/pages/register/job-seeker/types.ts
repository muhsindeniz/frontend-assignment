export interface Address {
  details: string;
  city: string;
  country: string;
}

export interface PersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: {
    details: string;
    city: string;
    country: string;
  };
  languages: Language[];
  profilePicture: string;
  role: boolean;
}

export interface WorkExperience {
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

export type SkillsFormType = {
  skills: string[];
};

export type SkillsErrors = {
  skills?: {
    type: string;
    message: string;
  };
};
