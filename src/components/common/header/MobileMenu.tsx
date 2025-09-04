"use client";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

interface Props {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  pathname: string;
}

export default function MobileMenu({ menuOpen, setMenuOpen, pathname }: Props) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div
      className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-light dark:bg-dark ${
        menuOpen
          ? "max-h-[500px] opacity-100 visible"
          : "max-h-0 opacity-0 invisible"
      }`}
    >
      <div className="py-4 flex flex-col border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/"
          className={`py-3 px-4 rounded-lg transition ${
            pathname === "/"
              ? "text-primary bg-gray-100 dark:bg-gray-800"
              : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        {/* About Us Dropdown */}
        <button
          className="flex justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setAboutOpen(!aboutOpen)}
        >
          <span
            className={`font-medium ${
              pathname.startsWith("/about") ? "text-primary" : ""
            }`}
          >
            About Us
          </span>
          {aboutOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            aboutOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="pl-6 flex flex-col pb-2">
            <Link
              href="/about/team"
              className={`text-sm py-2 px-4 rounded-lg ${
                pathname === "/about/team"
                  ? "text-primary bg-gray-100 dark:bg-gray-800"
                  : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/about/careers"
              className={`text-sm py-2 px-4 rounded-lg ${
                pathname === "/about/careers"
                  ? "text-primary bg-gray-100 dark:bg-gray-800"
                  : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Careers
            </Link>
          </div>
        </div>

        <Link
          href="/rooms"
          className={`py-3 px-4 rounded-lg transition ${
            pathname === "/rooms"
              ? "text-primary bg-gray-100 dark:bg-gray-800"
              : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          Rooms
        </Link>

        <Link
          href="/contact-us"
          className={`py-3 px-4 rounded-lg transition ${
            pathname === "/contact-us"
              ? "text-primary bg-gray-100 dark:bg-gray-800"
              : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
