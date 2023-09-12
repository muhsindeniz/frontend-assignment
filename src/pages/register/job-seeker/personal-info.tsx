import React, { useEffect } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { PersonalInfo, type PersonalInfo as PersonalInfoType } from "./types";
import AppLayout from "~/layouts/AppLayout";
import { useDispatch } from "react-redux";
import { setPersonalInfo } from "~/slices/registerJobSeekSlice";
import { useRouter } from "next/router";
import FileUpload from "~/components/Upload/FileUpload";
import { useAppSelector } from "~/hooks/hooks";
import { UserType } from "../types";

const PersonalInfo: React.FC = () => {
  const userData = useAppSelector((state) => state.register);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoType>();

  const {
    fields: languageFields,
    append: languageAppend,
    remove: languageRemove,
  } = useFieldArray({
    control,
    name: "languages",
  });


  const onSubmit: SubmitHandler<PersonalInfo> = (data) => {
    dispatch(
      setPersonalInfo({
        ...data,
        role: UserType.JOB_SEEKER,
      }),
    );
    router.push("/register/job-seeker/work-education-history");
  };

  const handleFilesChange = (files: File[] | null) => {
    if (files && files.length) {
      dispatch(
        setPersonalInfo({
          profilePicture:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        }),
      );
    }
  };

  return (
    <AppLayout title="ACME Personal Info Step">
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="m-auto w-full max-w-2xl rounded-md bg-neutral p-4">
          <div className="flex justify-between">
            <h2 className="mb-3 text-center text-xl font-bold">
              Personal Information
            </h2>
            <h2>1 / 3</h2>
          </div>

          <div className="mt-1">
            <FileUpload
              accept="image/*, .pdf"
              onChange={handleFilesChange}
              className="my-file-upload"
              type="single"
              defaultValue={userData.profilePicture || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="name"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span className="flex items-center">Name</span>
              {errors.name && (
                <span className="text-xs text-red-500">
                  *({errors.name.message})
                </span>
              )}
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.name || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="surname"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span className="flex items-center">Surname</span>
              {errors.surname && (
                <span className="text-xs text-red-500">
                  *({errors.surname.message})
                </span>
              )}
            </label>
            <input
              id="surname"
              type="text"
              {...register("surname", { required: "Surname is required" })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.surname || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="dateOfBirth"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span>Date of Birth</span>
              {errors.dateOfBirth && (
                <span className="text-xs text-red-500">
                  *({errors.dateOfBirth.message})
                </span>
              )}
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.dateOfBirth || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="email"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span>Email</span>
              {errors.email && (
                <span className="text-xs text-red-500">
                  *({errors.email.message})
                </span>
              )}
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.email || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="phone"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span>Phone</span>
              {errors.phone && (
                <span className="text-xs text-red-500">
                  *({errors.phone.message})
                </span>
              )}
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.phone || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="address.details"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span className="flex items-center"> Address Details</span>
              {errors.address?.details && (
                <span className="text-xs text-red-500">
                  *({errors.address.details.message})
                </span>
              )}
            </label>
            <input
              id="address.details"
              type="text"
              {...register("address.details", {
                required: "Address is required",
              })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.address.details || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="address.city"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span>City</span>
              {errors.address?.city && (
                <span className="text-xs text-red-500">
                  *({errors.address.city.message})
                </span>
              )}
            </label>
            <input
              id="address.city"
              type="text"
              {...register("address.city", { required: "City is required" })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.address.city || ""}
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="address.country"
              className="flex gap-2 text-sm font-medium text-gray-700"
            >
              <span>Country</span>
              {errors.address?.country && (
                <span className="text-xs text-red-500">
                  *({errors.address.country.message})
                </span>
              )}
            </label>
            <input
              id="address.country"
              type="text"
              {...register("address.country", {
                required: "Country is required",
              })}
              className="mt-1 w-full rounded-md border p-2"
              defaultValue={userData.address.country || ""}
            />
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold">Languages</h3>
            {languageFields.map((field, index) => (
              <div key={field.id}>
                <div className="mb-1">
                  <label
                    htmlFor={`languages[${index}].language`}
                    className="flex gap-2 text-sm font-medium text-gray-700"
                  >
                    <span>Language</span>
                    {(errors.languages as any)?.[index]?.language && (
                      <span className="text-xs text-red-500">
                        *({(errors.languages as any)[index]?.language?.message})
                      </span>
                    )}
                  </label>
                  <input
                    id={`languages.${index}.language`}
                    {...register(`languages.${index}.language`, {
                      required: "Language is required",
                    })}
                    className="mt-1 w-full rounded-md border p-2"
                    defaultValue={field.language}
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor={`languages[${index}].level`}
                    className="flex gap-2 text-sm font-medium text-gray-700"
                  >
                    <span>Level</span>
                    {errors.languages?.[index]?.level && (
                      <span className="text-xs text-red-500">
                        *({errors.languages[index]?.language?.message})
                      </span>
                    )}
                  </label>
                  <select
                    id={`languages[${index}].level`}
                    {...register(`languages.${index}.level`, {
                      required: true,
                    })}
                    className="mt-1 w-full rounded-md border p-2"
                    defaultValue={field.level}
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => languageRemove(index)}
                  className="rounded-md bg-red-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
                >
                  Remove Language
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => languageAppend({ language: "", level: "" })}
              className="mt-4 rounded-md bg-blue-600 px-5 py-1 text-white transition-all hover:bg-opacity-80"
            >
              Add Language
            </button>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Next Step
          </button>
        </div>
      </form>
    </AppLayout>
  );
};

export default PersonalInfo;
