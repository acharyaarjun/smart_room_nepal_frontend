"use client";

import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { FaRegMoon, FaDesktop } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ThemeMode } from "@/enums";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const getButtonClasses = (mode: string) => {
    const isActive = theme === mode;

    return `
      flex justify-center items-center h-8 w-8 p-2 rounded-md transition duration-300 cursor-pointer
      ${
        isActive &&
        "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
      }
    `;
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-800 dark:text-gray-200 font-medium">
        Mode:
      </span>

      {/* Light Mode */}
      <div
        className={getButtonClasses(ThemeMode.LIGHT)}
        onClick={() => setTheme(ThemeMode.LIGHT)}
        title="Light Mode"
      >
        <BiSun className="text-base" />
      </div>

      {/* Dark Mode */}
      <div
        className={getButtonClasses(ThemeMode.DARK)}
        onClick={() => setTheme(ThemeMode.DARK)}
        title="Dark Mode"
      >
        <FaRegMoon className="text-base" />
      </div>

      {/* System / Auto Mode */}
      <div
        className={getButtonClasses(ThemeMode.SYSTEM)}
        onClick={() => setTheme(ThemeMode.SYSTEM)}
        title="System / Auto Mode"
      >
        <FaDesktop className="text-base" />
      </div>
    </div>
  );
};

export default ThemeToggler;
