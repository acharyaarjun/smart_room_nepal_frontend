"use client";
import React, { Suspense } from "react";
import { FaUser } from "react-icons/fa";
import { Dropdown, Spinner, ThemeToggler } from "@/components/common";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogin } from "@/hooks";
import Image from "next/image";
import { HostSidebarMenuData } from "@/data/hostSidebar";
import { UserSidebarMenuData } from "@/data/userSidebar";
import { SidebarMenu } from "@/types/navbar/menu";

const ProfileDropdownComponent = () => {
  const dropdownText = "text-normal";

  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, handleLogout } = useLogin();

  // Select the appropriate sidebar menu based on user role
  let menuData: SidebarMenu[] = [];
  if (user?.role === "host") {
    menuData = HostSidebarMenuData;
  } else if (user?.role === "user") {
    menuData = UserSidebarMenuData;
  }

  // Filter menu items based on user role
  const filteredMenuData = menuData.filter((menu) => {
    if (!menu.roles || menu.roles.length === 0) {
      return true; // No role restriction
    }
    return user?.role && menu.roles.includes(user.role);
  });

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
            {filteredMenuData.map((menu: SidebarMenu) => (
              <li key={menu.id}>
                <Link
                  href={menu.link}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-primary/10 font-medium rounded-md"
                >
                  <menu.icon className="text-lg" />
                  <span>{menu.title}</span>
                </Link>
              </li>
            ))}
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
