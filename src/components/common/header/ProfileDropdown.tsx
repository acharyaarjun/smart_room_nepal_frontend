"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { Dropdown, ThemeToggler } from "@/components/common";

export default function ProfileDropdown() {
  const dropdownText = "text-normal";

  return (
    <Dropdown
      trigger={
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md">
          <FaUser className="cursor-pointer text-gray-600 dark:text-gray-300 text-base" />
        </div>
      }
      position="right"
      triggerMode="click"
    >
      <ul className={`flex flex-col text-base min-w-[200px] ${dropdownText}`}>
        <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-md font-medium">
          Dashboard
        </li>
        <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-md font-medium">
          Profile
        </li>
        <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-md font-medium">
          Settings
        </li>
        <li className="px-4 py-2 hover:bg-danger/10 cursor-pointer rounded-md text-danger font-medium">
          Sign Out
        </li>

        <hr className="border-gray-200 dark:border-gray-700 my-1" />
        <li className="px-4 py-2">
          <ThemeToggler />
        </li>
      </ul>
    </Dropdown>
  );
}
