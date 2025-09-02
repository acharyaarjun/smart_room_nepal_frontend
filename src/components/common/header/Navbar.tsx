"use client";
import { AppConsts } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown, ThemeToggler } from "@/components/common";
import {
  FaBell,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export default function Navbar() {
  const dropdownText = "text-normal";

  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="w-full bg-light dark:bg-dark sticky top-0 z-50 h-[80px]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          {/* Logo and mobile hamburger */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Image
              src="/long-logo.png"
              alt="Logo"
              width={400}
              height={400}
              className="h-[55px] w-auto"
              title={AppConsts.APP_NAME}
            />

            {/* Right Side Icons - Visible on mobile only */}
            <div className="flex items-center space-x-4 md:hidden">
              {/* Search */}
              <Dropdown
                trigger={
                  <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md">
                    <CiSearch className="cursor-pointer text-gray-600 dark:text-gray-300" />
                  </div>
                }
                position="right"
                triggerMode="click"
              >
                <div className="p-2 flex justify-center items-center min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 h-[40px] border border-primary rounded-l-md text-sm bg-background text-gray-800 dark:text-gray-200 focus:outline-none"
                  />
                  <div className="h-[40px] flex justify-center items-center bg-primary px-3 py-2 border-primary rounded-r-md text-light">
                    <CiSearch className="text-lg cursor-pointer" />
                  </div>
                </div>
              </Dropdown>

              {/* Notification */}
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

              {/* Profile */}
              <Dropdown
                trigger={
                  <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md">
                    <FaUser className="cursor-pointer text-gray-600 dark:text-gray-300 text-base" />
                  </div>
                }
                position="right"
                triggerMode="click"
              >
                <ul
                  className={`flex flex-col text-base min-w-[200px] ${dropdownText}`}
                >
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
                  <li className="px-4 py-2 ">
                    <ThemeToggler />
                  </li>
                </ul>
              </Dropdown>

              {/* Hamburger for mobile with animation */}
              <button
                className="flex items-center justify-center text-gray-800 dark:text-gray-200 text-xl transition-transform duration-300 hover:scale-110"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaBars
                    className={`absolute transition-all duration-300 ${
                      menuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                  />
                  <FaTimes
                    className={`absolute transition-all duration-300 ${
                      menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Center Nav Links - Hidden on mobile, shown on medium+ */}
          <div className="hidden md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 w-full md:w-auto mt-2 md:mt-0">
            <Link
              href={"/"}
              className="cursor-pointer hover:text-primary font-medium transition-colors duration-200"
            >
              Home
            </Link>

            <Dropdown
              trigger={
                <span className="cursor-pointer hover:text-primary font-medium transition-colors duration-200 flex items-center">
                  About Us
                </span>
              }
              position="left"
              triggerMode="hover"
            >
              <ul className={`flex flex-col text-base ${dropdownText}`}>
                <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer hover:text-primary font-semibold rounded-md transition-colors duration-200">
                  Team
                </li>
                <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer hover:text-primary font-semibold rounded-md transition-colors duration-200">
                  Careers
                </li>
              </ul>
            </Dropdown>

            <Link
              href={"/rooms"}
              className="cursor-pointer hover:text-primary font-medium transition-colors duration-200"
            >
              Rooms
            </Link>
            <Link
              href={"/contact-us"}
              className="cursor-pointer hover:text-primary font-medium transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side Icons - Hidden on mobile, shown on medium+ */}
          <div className="hidden md:flex items-center space-x-4 mt-2 md:mt-0 ">
            {/* Search */}
            <Dropdown
              trigger={
                <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md">
                  <CiSearch className="cursor-pointer text-gray-600 dark:text-gray-300" />
                </div>
              }
              position="right"
              triggerMode="click"
            >
              <div className="p-2 flex justify-center items-center min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 h-[40px] border border-primary rounded-l-md text-sm bg-background text-gray-800 dark:text-gray-200 focus:outline-none"
                />
                <div className="h-[40px] flex justify-center items-center bg-primary px-3 py-2 border-primary rounded-r-md text-light">
                  <CiSearch className="text-lg cursor-pointer" />
                </div>
              </div>
            </Dropdown>

            {/* Notification */}
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

            {/* Profile */}
            <Dropdown
              trigger={
                <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 h-8 w-8 rounded-md">
                  <FaUser className="cursor-pointer text-gray-600 dark:text-gray-300 text-base" />
                </div>
              }
              position="right"
              triggerMode="click"
            >
              <ul
                className={`flex flex-col text-base min-w-[200px] ${dropdownText}`}
              >
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
                <li className="px-4 py-2 ">
                  <ThemeToggler />
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-light dark:bg-dark ${
            menuOpen
              ? "max-h-[500px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="py-4 flex flex-col border-t border-gray-200 dark:border-gray-700 mt-2">
            <Link
              href={"/"}
              className="cursor-pointer hover:text-primary font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800">
              <button
                className="flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                <span className="cursor-pointer hover:text-primary font-medium">
                  About Us
                </span>
                {aboutOpen ? (
                  <FaChevronUp className="text-gray-500 transition-transform duration-300" />
                ) : (
                  <FaChevronDown className="text-gray-500 transition-transform duration-300" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  aboutOpen ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="pl-6 flex flex-col pb-2">
                  <Link
                    href="#"
                    className="text-sm py-2 px-4 hover:text-primary font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    href="#"
                    className="text-sm py-2 px-4 hover:text-primary font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    Careers
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href={"/rooms"}
              className="cursor-pointer hover:text-primary font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Rooms
            </Link>

            <Link
              href={"/contact-us"}
              className="cursor-pointer hover:text-primary font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
