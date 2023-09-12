import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import AppLayout from "~/layouts/AppLayout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { WorkExperience, Education } from "./types";
import { setPersonalInfo } from "~/slices/registerJobSeekSlice";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useAppSelector } from "~/hooks/hooks";

interface FormInput {
  experience: WorkExperience[];
  education: Education[];
}

const WorkEducationHistory: React.FC = () => {
  const userData = useAppSelector((state) => state.register);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      experience: [{ company: "", position: "", startDate: "", endDate: "" }],
      education: [{ institution: "", degree: "", startDate: "", endDate: "" }],
    },
  });

  const {
    fields: expFields,
    append: expAppend,
    remove: expRemove,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({
    control,
    name: "education",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const transformedData = {
      ...data,
      experience: data.experience.map((exp) => ({
        ...exp,
        startDate: new Date(exp.startDate).toISOString(),
        endDate: new Date(exp.endDate).toISOString(),
      })),
      education: data.education.map((edu) => ({
        ...edu,
        startDate: new Date(edu.startDate).toISOString(),
        endDate: new Date(edu.endDate).toISOString(),
      })),
    };
    dispatch(setPersonalInfo(transformedData));
    router.push("/register/job-seeker/skills");
  };

  return (
    <AppLayout title="ACME Personal Info Step">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center"
      >
        <div className="mx-auto w-full max-w-2xl rounded-md bg-neutral p-4">
          <div className="flex justify-between">
            <h2 className="mb-3 flex text-center text-xl font-bold">
              <Link href="/register/job-seeker/personal-info">
                <button>
                  <IoIosArrowBack size={26} />
                </button>
              </Link>
              Okul ve İş Geçmişi
            </h2>
            <h2>2 / 3</h2>
          </div>
          <h2 className="mb-4 mt-8 text-2xl font-bold">Work Experience</h2>
          {expFields.map((field, index) => (
            <div key={field.id} className="mb-4 space-y-2">
              <div>
                <label className="mb-2 flex items-center gap-2">
                  Company
                  {errors.experience?.[index]?.company && (
                    <span className="text-xs text-red-500">
                      *({errors.experience[index]?.company?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register(`experience.${index}.company`, {
                    required: "Company is required.",
                  })}
                  defaultValue={field.company}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  Position
                  {errors.experience?.[index]?.position && (
                    <span className="text-xs text-red-500">
                      *({errors.experience[index]?.position?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register(`experience.${index}.position`, {
                    required: "Position is required.",
                  })}
                  defaultValue={field.position}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  Start Date
                  {errors.experience?.[index]?.startDate && (
                    <span className="text-xs text-red-500">
                      *({errors.experience[index]?.startDate?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="date"
                  {...register(`experience.${index}.startDate`, {
                    required: "Start date is required.",
                  })}
                  defaultValue={field.startDate}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  End Date
                  {errors.experience?.[index]?.endDate && (
                    <span className="text-xs text-red-500">
                      *({errors.experience[index]?.endDate?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="date"
                  {...register(`experience.${index}.endDate`, {
                    required: "End date is required.",
                  })}
                  defaultValue={field.endDate}
                />
              </div>

              <button
                type="button"
                onClick={() => expRemove(index)}
                className="rounded-md bg-red-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
              >
                Remove Experience
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-4 rounded-md bg-blue-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
            onClick={() =>
              expAppend({
                company: "",
                position: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            Add Experience
          </button>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Education</h2>
          {eduFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div>
                <label className="mb-2 flex items-center gap-2">
                  Institution
                  {errors.education?.[index]?.institution && (
                    <span className="text-xs text-red-500">
                      *({errors.education[index]?.institution?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register(`education.${index}.institution`, {
                    required: "Institution is required.",
                  })}
                  defaultValue={field.institution}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  Degree
                  {errors.education?.[index]?.degree && (
                    <span className="text-xs text-red-500">
                      *({errors.education[index]?.degree?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register(`education.${index}.degree`, {
                    required: "Degree is required.",
                  })}
                  defaultValue={field.degree}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  Start Date
                  {errors.education?.[index]?.startDate && (
                    <span className="text-xs text-red-500">
                      *({errors.education[index]?.startDate?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="date"
                  {...register(`education.${index}.startDate`, {
                    required: "Start date is required.",
                  })}
                  defaultValue={field.startDate}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2">
                  End Date
                  {errors.education?.[index]?.endDate && (
                    <span className="text-xs text-red-500">
                      *({errors.education[index]?.endDate?.message})
                    </span>
                  )}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="date"
                  {...register(`education.${index}.endDate`, {
                    required: "End date is required.",
                  })}
                  defaultValue={field.endDate}
                />
              </div>

              <button
                type="button"
                onClick={() => eduRemove(index)}
                className="rounded-md bg-red-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
              >
                Remove Experience
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-4 rounded-md bg-blue-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
            onClick={() =>
              eduAppend({
                degree: "",
                endDate: "",
                institution: "",
                startDate: "",
              })
            }
          >
            Add Education
          </button>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white"
            >
              Next Step
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
};

export default WorkEducationHistory;
