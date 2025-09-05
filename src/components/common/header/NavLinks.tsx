"use client";
import Link from "next/link";

interface Props {
  pathname: string;
}

export default function NavLinks({ pathname }: Props) {
  const isActive = (path: string) => pathname === path;

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
      <Link
        href="/host-register"
        className={`font-medium transition-colors ${
          isActive("/host-register") ? "text-primary" : "hover:text-primary"
        }`}
      >
        Become a Host
      </Link>
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
