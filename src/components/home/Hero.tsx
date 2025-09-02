"use client";
import Link from "next/link";
import React, { useState } from "react";
import heroImage from "@/assets/images/home/hero.jpg";
import heroIconOne from "@/assets/images/home/hero-icon-one.jpg";
import heroIconTwo from "@/assets/images/home/hero-icon-two.jpg";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaSearch, FaMapMarkerAlt, FaBed, FaRupeeSign } from "react-icons/fa";
import Select from "react-select";
import { FaCirclePlay } from "react-icons/fa6";
import { useTheme } from "next-themes";

export default function Hero() {
  const [selectedLocation, setSelectedLocation] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // Options for the dropdowns
  const locationOptions = [
    { value: "kathmandu", label: "Kathmandu" },
    { value: "pokhara", label: "Pokhara" },
    { value: "lalitpur", label: "Lalitpur" },
    { value: "bhaktapur", label: "Bhaktapur" },
    { value: "chitwan", label: "Chitwan" },
    { value: "butwal", label: "Butwal" },
    { value: "biratnagar", label: "Biratnagar" },
    { value: "dharan", label: "Dharan" },
  ];

  const roomTypeOptions = [
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "shared", label: "Shared Room" },
    { value: "studio", label: "Studio Apartment" },
    { value: "1bhk", label: "1 BHK" },
    { value: "2bhk", label: "2 BHK" },
    { value: "hostel", label: "Hostel Bed" },
  ];

  const budgetOptions = [
    { value: "5000-10000", label: "Rs. 5,000 - 10,000" },
    { value: "10000-15000", label: "Rs. 10,000 - 15,000" },
    { value: "15000-25000", label: "Rs. 15,000 - 25,000" },
    { value: "25000-40000", label: "Rs. 25,000 - 40,000" },
    { value: "40000+", label: "Rs. 40,000+" },
  ];

  const { theme } = useTheme();

  // Theme-aware select styles
  const customSelectStyles = {
    control: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      minHeight: "48px",
      backgroundColor: theme === "dark" ? "hsl(0, 0%, 15%)" : "transparent",
      border: state.isFocused
        ? "2px solid #5143d9"
        : theme === "dark"
        ? "1px solid hsl(0, 0%, 40%)"
        : "1px solid hsl(0, 0%, 80%)",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(81, 67, 217, 0.1)" : "none",
      "&:hover": {
        border: "1px solid #5143d9",
      },
    }),
    menu: (provided: object) => ({
      ...provided,
      backgroundColor:
        theme === "dark" ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 100%)",
      border:
        theme === "dark"
          ? "1px solid hsl(0, 0%, 30%)"
          : "1px solid hsl(0, 0%, 40%)",
      borderRadius: "8px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      zIndex: 9999,
    }),
    option: (
      provided: object,
      state: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#5143d9"
        : state.isFocused
        ? theme === "dark"
          ? "hsl(0, 0%, 25%)"
          : "hsl(0, 0%, 96%)"
        : "transparent",
      color: state.isSelected
        ? "white"
        : theme === "dark"
        ? "hsl(0, 0%, 90%)"
        : "hsl(0, 0%, 20%)",
      "&:hover": {
        backgroundColor: "#5143d9",
        color: "white",
      },
      padding: "10px 12px",
    }),
    singleValue: (provided: object) => ({
      ...provided,
      color: theme === "dark" ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 20%)",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: theme === "dark" ? "hsl(0, 0%, 60%)" : "hsl(0, 0%, 60%)",
    }),
    input: (provided: object) => ({
      ...provided,
      color: theme === "dark" ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 20%)",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      color: theme === "dark" ? "hsl(0, 0%, 60%)" : "hsl(0, 0%, 60%)",
      "&:hover": {
        color: "#5143d9",
      },
    }),
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedLocation, selectedRoomType, selectedBudget });
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex items-center justify-center py-12 lg:py-20"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Nepal&apos;s #1{" "}
              <span className="relative inline-block text-primary">
                Room Finder
                <svg
                  className="absolute left-0 -bottom-2 w-full h-4"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q100,0 200,10"
                    stroke="#5143d9"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Platform
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              SmartRoom Nepal connects you with verified landlords and quality
              rooms across Nepal. From affordable hostels to luxury apartments,
              find your perfect living space with transparent pricing, virtual
              tours, and secure rental agreements.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <Link
                href={"/rooms"}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Your Search
              </Link>

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={heroIconOne}
                    alt="SmartRoom Nepal Success Stories"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors duration-300">
                    <FaCirclePlay className="text-white text-xl" />
                  </div>
                </div>
                <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                  Success Stories
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center order-2">
            <div className="relative w-full">
              <div className="relative shadow-xl pt-4">
                <Image
                  src={heroImage}
                  alt="Quality rooms and apartments in Nepal"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                />

                <div className="hidden lg:block absolute top-20 -left-7 h-14 w-14 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src={heroIconOne}
                    alt="Verified Property"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="hidden lg:block absolute top-50 -left-10 h-20 w-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src={heroIconTwo}
                    alt="Happy Tenant"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-0 -right-4 rounded-lg bg-white/90 dark:bg-dropdown/90 backdrop-blur-sm flex flex-col justify-center items-center p-4 shadow-custom border border-gray-100 dark:border-gray-700">
                  <BiSupport className="text-3xl text-primary mb-2" />
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                    24 / 7
                  </h4>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
                    Rental Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="w-full order-3 -mt-20 z-20 relative">
          <div className="bg-white/95 dark:bg-dropdown/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Find Your Ideal Room in Nepal
            </h3>

            <form onSubmit={handleSearch} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    City/Location
                  </label>
                  <Select
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    options={locationOptions}
                    placeholder="Select city..."
                    styles={customSelectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    required
                  />
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaBed className="text-primary" />
                    Room Type
                  </label>
                  <Select
                    value={selectedRoomType}
                    onChange={setSelectedRoomType}
                    options={roomTypeOptions}
                    placeholder="Select room type..."
                    styles={customSelectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    required
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaRupeeSign className="text-primary" />
                    Budget Range
                  </label>
                  <Select
                    value={selectedBudget}
                    onChange={setSelectedBudget}
                    options={budgetOptions}
                    placeholder="Select budget..."
                    styles={customSelectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    required
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FaSearch className="text-sm" />
                    Find Rooms
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Over{" "}
                  <span className="font-semibold text-primary">5,000+</span>{" "}
                  verified rooms •
                  <span className="font-semibold text-green-600"> 2,000+</span>{" "}
                  happy tenants •
                  <span className="font-semibold text-blue-600"> 98%</span>{" "}
                  satisfaction rate
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
