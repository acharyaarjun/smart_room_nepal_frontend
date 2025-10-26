"use client";
import React, { Suspense } from "react";
import { FaUser } from "react-icons/fa";
import { Dropdown, Spinner, ThemeToggler } from "@/components/common";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogin } from "@/hooks";
import Image from "next/image";

const ProfileDropdownComponent = () => {
  const dropdownText = "text-normal";

  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, handleLogout } = useLogin();

  // Determine dashboard URL based on user role
  const dashboardUrl =
    user?.role === "host" ? "/dashboard/host" : "/dashboard/user";

  // Determine settings URL based on user role
  const settingsUrl =
    user?.role === "host"
      ? "/dashboard/host/settings"
      : "/dashboard/user/settings";

  return (
    <Dropdown
      trigger={
        <div className="flex justify-center items-center h-8 w-8 overflow-hidden rounded-md transition duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
          {user?.userProfile?.avatar?.url ? (
            <Image
              src={user.userProfile.avatar.url}
              alt={user?.fullName || "User Avatar"}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : user?.fullName ? (
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-white font-bold">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <FaUser className="text-gray-600 dark:text-gray-300 text-base" />
          )}
        </div>
      }
      position="right"
      triggerMode="click"
    >
      <ul className={`flex flex-col text-base min-w-[200px] ${dropdownText}`}>
        {user ? (
          <>
            <li>
              <Link
                href={dashboardUrl}
                className="block w-full px-4 py-2 hover:bg-primary/10 font-medium rounded-md"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={settingsUrl}
                className="block w-full px-4 py-2 hover:bg-primary/10 font-medium rounded-md"
              >
                Settings
              </Link>
            </li>
            <li>
              <div
                onClick={isLoading ? undefined : handleLogout}
                className={`text-start w-full px-4 py-2 hover:bg-danger/10 text-danger font-medium rounded-md ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isLoading ? "Logging out..." : "Logout"}
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="block w-full px-4 py-2 hover:bg-primary/10 font-medium rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block w-full px-4 py-2 hover:bg-primary/10 font-medium rounded-md"
              >
                Register
              </Link>
            </li>
          </>
        )}

        <hr className="border-gray-200 dark:border-gray-700 my-1" />
        <li className="px-4 py-2">
          <ThemeToggler />
        </li>
      </ul>
    </Dropdown>
  );
};

export default function ProfileDropdown() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileDropdownComponent />
    </Suspense>
  );
}
