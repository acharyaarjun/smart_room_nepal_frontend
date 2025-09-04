"use client";
import Link from "next/link";
import { Dropdown } from "@/components/common";

interface Props {
  pathname: string;
}

export default function NavLinks({ pathname }: Props) {
  const isActive = (path: string) => pathname === path;
  const isAboutActive = pathname.startsWith("/about");

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link
        href="/"
        className={`font-medium transition-colors ${
          isActive("/") ? "text-primary" : "hover:text-primary"
        }`}
      >
        Home
      </Link>

      <Dropdown
        trigger={
          <span
            className={`cursor-pointer font-medium flex items-center ${
              isAboutActive ? "text-primary" : "hover:text-primary"
            }`}
          >
            About Us
          </span>
        }
        position="left"
        triggerMode="hover"
      >
        <ul className="flex flex-col text-base">
          <li
            className={`px-4 py-2 cursor-pointer font-semibold rounded-md ${
              pathname === "/about/team"
                ? "text-primary bg-primary/10"
                : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Team
          </li>
          <li
            className={`px-4 py-2 cursor-pointer font-semibold rounded-md ${
              pathname === "/about/careers"
                ? "text-primary bg-primary/10"
                : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Careers
          </li>
        </ul>
      </Dropdown>

      <Link
        href="/rooms"
        className={`font-medium transition-colors ${
          isActive("/rooms") ? "text-primary" : "hover:text-primary"
        }`}
      >
        Rooms
      </Link>
      <Link
        href="/contact-us"
        className={`font-medium transition-colors ${
          isActive("/contact-us") ? "text-primary" : "hover:text-primary"
        }`}
      >
        Contact Us
      </Link>
    </div>
  );
}
