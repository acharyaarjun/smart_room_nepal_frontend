"use client";

import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ThemeMode } from "@/enums";

const ThemeToggler = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === ThemeMode.SYSTEM ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(
      currentTheme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    );
  };

  return (
    <button onClick={toggleTheme}>
      {currentTheme === ThemeMode.DARK ? (
        <div className="text-[20px] text-primary font-semibold">
          <FaRegMoon />
        </div>
      ) : (
        <div className="text-[20px] text-primary font-semibold">
          <BiSun />
        </div>
      )}
    </button>
  );
};

export default ThemeToggler;
