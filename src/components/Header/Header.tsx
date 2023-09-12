import React, { useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "~/hooks/hooks";

import { useRouter } from "next/router";
import { addUserInfo, logout } from "~/slices/userSlice";

const Dropdown = dynamic(() => import("../Dropdown/Dropdown"), { ssr: false });

const Header = () => {
  const menuItems = [{ key: "1", label: "Profile", href: "/profile" }];
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser && !user.isLoggedIn) {
      dispatch(addUserInfo(JSON.parse(localStorageUser)));

      if (!localStorageUser && !user.isLoggedIn) {
        router.push("/");
      }
    }
  }, [user, router]);
  
  const useLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-neutral">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            ACME
          </span>
        </a>
        {user.isLoggedIn ? (
          <div className="relative z-20">
            <button
              type="button"
              onClick={() => useLogout()}
              className="mb-2 mr-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 "
            >
              Logout
            </button>
            <Dropdown
              menu={{ items: menuItems }}
              className="flex items-center gap-2"
            >
              {user.name} <HiOutlineUserCircle size={26} />
            </Dropdown>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href="/login">
              <button className="rounded-sm px-7 py-1 text-gray-800 transition-all hover:text-opacity-60">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="rounded-sm bg-neutral-dark px-7 py-1 text-white transition-all hover:bg-opacity-80">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Header;
