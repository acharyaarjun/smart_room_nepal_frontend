"use client";
import React from "react";
import { FaBell } from "react-icons/fa";
import { Dropdown } from "@/components/common";

export default function NotificationDropdown() {
  const dropdownText = "text-normal";

  return (
    <Dropdown
      trigger={
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md relative">
          <FaBell className="cursor-pointer text-gray-600 dark:text-gray-300 text-base" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full border border-gray-200 dark:border-gray-700"></span>
        </div>
      }
      position="right"
      triggerMode="click"
    >
      <ul className={`text-base min-w-[200px] ${dropdownText}`}>
        <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-md font-medium">
          No new notifications
        </li>
      </ul>
    </Dropdown>
  );
}
