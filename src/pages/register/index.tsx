import React from "react";
import Link from "next/link";
import AppLayout from "~/layouts/AppLayout";

const Register = () => {
  return (
    <AppLayout title="ACME Sign Up">
      <div className="flex h-full w-full items-center">
        <div className="mx-auto flex w-full max-w-2xl gap-3 rounded-md p-4">
          <Link
            href="/register/employer"
            className="w-1/2 bg-teal-500 text-center h-48 text-white text-2xl flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            İşveren
          </Link>
          <Link
            href="/register/job-seeker/personal-info"
            className="w-1/2 bg-teal-500 text-center h-48 text-white text-2xl flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            İş Arayan
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
