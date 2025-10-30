"use client";
import React, { useState } from "react";
import { AppConsts } from "@/utils";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  NavLinks,
  Logo,
  SearchDropdown,
  NotificationDropdown,
  ProfileDropdown,
  MobileMenu,
} from "@/components/common/header";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="w-full bg-light dark:bg-dark sticky top-0 z-50 h-[80px]">
      <div className="container">
        <div className="flex justify-between items-center py-3">
          {/* Left: Logo */}
          <Logo appName={AppConsts.APP_NAME} />

          {/* Center: Nav Links */}
          <NavLinks pathname={pathname} />

          {/* Right: Icons (desktop only) */}
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {/* <SearchDropdown />
            <NotificationDropdown /> */}
            <ProfileDropdown />
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center text-gray-800 dark:text-gray-200 text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          pathname={pathname}
        />
      </div>
    </section>
  );
}
