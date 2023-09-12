import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SkillsFormType, SkillsErrors } from "./types";
import AppLayout from "~/layouts/AppLayout";
import { useDispatch } from "react-redux";
import { setPersonalInfo, setSkills } from "~/slices/registerJobSeekSlice";
import { addUserInfo } from "~/slices/userSlice";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import MultiSelectInput from "~/components/MultiSelectInput";
import { createUser } from "~/services/api/user";
import { useAppSelector } from "~/hooks/hooks";
import { useRouter } from "next/router";
import { useToast } from "~/context/AppDesignContext";

const Skills: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const skillsOptions = [
    "Java",
    "JavaScript",
    "Python",
    "C++",
    "C#",
    "SQL",
    "HTML",
    "CSS",
  ];

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SkillsFormType>({
    defaultValues: {
      skills: [],
    },
    mode: "onChange",
    criteriaMode: "all",
    resolver: async (data: SkillsFormType) => {
      const errors: SkillsErrors = {};

      if (!data.skills || data.skills.length === 0) {
        errors.skills = {
          type: "required",
          message: "Skills are required",
        };
      }

      return {
        values: data,
        errors,
      };
    },
  });

  const handleSkillsChange = (selectedSkills: string[]) => {
    dispatch(setSkills(selectedSkills));
    setValue("skills", selectedSkills);
  };
  const { success, warning } = useToast();
  const userData = useAppSelector((state) => state.register);

  const onSubmit: SubmitHandler<SkillsFormType> = async () => {
    try {
      const createdUser = await createUser(userData);
      if (createdUser) {
        localStorage.setItem("user", JSON.stringify(createdUser));
        dispatch(addUserInfo(createdUser));
        success({
          title: "Kayıt Başarılı!",
          duration: 4000,
          position: "top-center",
        });
        router.push("/home");
      }
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      warning({
        title: error.message,
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <AppLayout title="ACME Personal Info Step">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className="w-full max-w-2xl rounded-md bg-neutral p-4">
          <div className="flex justify-between">
            <h2 className="mb-3 flex text-center text-xl font-bold">
              <Link href="/register/job-seeker/work-education-history">
                <button>
                  <IoIosArrowBack size={26} />
                </button>
              </Link>
              Skills
            </h2>
            <h2>3 / 3</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select your skills
            </label>
            <MultiSelectInput
              options={skillsOptions}
              onChange={handleSkillsChange}
            />
            {errors.skills && (
              <span className="text-xs text-red-500">Skills are required</span>
            )}
          </div>

          <button className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </form>
    </AppLayout>
  );
};

export default Skills;
