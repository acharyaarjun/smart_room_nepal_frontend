"use client";
import { AppConsts } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import {
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Details */}
          <div className="space-y-4">
            <Image
              src="/long-logo.png"
              alt="Smart Room Nepal Logo"
              width={200}
              height={60}
              className="h-16 w-auto"
            />
            <p className="text-gray-300 text-base leading-relaxed font-medium">
              Your premier destination for smart home solutions in Nepal. We
              provide cutting-edge technology to transform your living space
              into a modern, efficient, and secure smart environment.
            </p>
          </div>

          {/* Column 2: Page Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Smart Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-base font-medium"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Our Location</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary text-base mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-base font-medium">
                    Smart Room Nepal Pvt. Ltd.
                  </p>
                  <p className="text-gray-300 text-base font-medium">
                    New Baneshwor, Kathmandu
                  </p>
                  <p className="text-gray-300 text-base font-medium">
                    Nepal - 44600
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary text-base" />
                <span className="text-gray-300 text-base font-medium">
                  Office: +977-1-1234567
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href={AppConsts.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors duration-200 p-2 rounded-full"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-base" />
              </a>
              <a
                href={AppConsts.TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors duration-200 p-2 rounded-full"
                aria-label="Twitter"
              >
                <FaTwitter className="text-base" />
              </a>
              <a
                href={AppConsts.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors duration-200 p-2 rounded-full"
                aria-label="Instagram"
              >
                <FaInstagram className="text-base" />
              </a>
              <a
                href={AppConsts.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors duration-200 p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-base" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-base font-medium">
              © {currentYear} {AppConsts.APP_NAME}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary transition-colors duration-200 text-base font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-primary transition-colors duration-200 text-base font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-primary transition-colors duration-200 text-base font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
