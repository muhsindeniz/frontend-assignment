import React from "react";
import AppLayout from "~/layouts/AppLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "~/services/api/login";
import { useToast } from "~/context/AppDesignContext";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { addUserInfo } from "~/slices/userSlice";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { success, error } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await loginUser(data);

    if (result.success && result.user) {
      dispatch(addUserInfo(result.user));
      localStorage.setItem("user", JSON.stringify(result.user));

      success({
        title: result.message ?? "Giriş Başarılı!",
        duration: 3000,
        position: "top-center",
      });
      router.push("/home");
    } else {
      error({
        title: result.message ?? "Giriş Başarılı!",
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <AppLayout title="ACME Sign In">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-lg bg-neutral p-4">
          <h1 className="text-center text-2xl font-bold">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="john.doe@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="•••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
export default Login;
