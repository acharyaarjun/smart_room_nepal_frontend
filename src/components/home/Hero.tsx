"use client";
import Link from "next/link";
import React, { useState } from "react";
import heroImage from "@/assets/images/home/hero.jpg";
import heroIconOne from "@/assets/images/home/hero-icon-one.jpg";
import heroIconTwo from "@/assets/images/home/hero-icon-two.jpg";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaSearch, FaMapMarkerAlt, FaBed, FaUser } from "react-icons/fa";
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
  const [selectedPersons, setSelectedPersons] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // Options for the dropdowns
  const locationOptions = [
    { value: "kathmandu", label: "Kathmandu" },
    { value: "pokhara", label: "Pokhara" },
    { value: "chitwan", label: "Chitwan" },
    { value: "lalitpur", label: "Lalitpur" },
    { value: "bhaktapur", label: "Bhaktapur" },
  ];

  const roomTypeOptions = [
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "deluxe", label: "Deluxe Room" },
    { value: "suite", label: "Suite" },
    { value: "apartment", label: "Apartment" },
  ];

  const personsOptions = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 Persons" },
    { value: "3", label: "3 Persons" },
    { value: "4", label: "4 Persons" },
    { value: "5+", label: "5+ Persons" },
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
    console.log({ selectedLocation, selectedRoomType, selectedPersons });
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
              Find the best{" "}
              <span className="relative inline-block text-primary">
                Rooms nearby
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
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We help you discover the best rooms in your area, offering all the
              essential amenities, convenient locations, and affordable options
              so you can enjoy a comfortable, safe, and hassle-free stay every
              time.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <Link
                href={"/rooms"}
                className="px-4 py-3 bg-primary/10 rounded-md font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300 inline-block"
              >
                Discover Now
              </Link>

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={heroIconOne}
                    alt="Hero Icon One"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors duration-300">
                    <FaCirclePlay className="text-white text-xl" />
                  </div>
                </div>
                <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                  Watch our story
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
                  alt="Hero Image"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                />

                <div className="hidden lg:block absolute top-20 -left-7 h-14 w-14 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src={heroIconOne}
                    alt="Hero Icon One"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="hidden lg:block absolute top-50 -left-10 h-20 w-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src={heroIconTwo}
                    alt="Hero Icon Two"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-0 -right-4 rounded-lg bg-light/30 dark:bg-dropdown/90 flex flex-col justify-center items-center p-4 shadow-custom">
                  <BiSupport className="text-3xl text-danger" />
                  <h4 className="text-2xl font-bold ">24 / 7</h4>
                  <p className="text-base font-medium">Guide Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="w-full order-3 -mt-20 z-20 relative">
          <div className="bg-light dark:bg-dropdown rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Find Your Perfect Room
            </h3>

            <form onSubmit={handleSearch} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className=" text-sm font-medium text-normal flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Location
                  </label>
                  <Select
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    options={locationOptions}
                    placeholder="Select location..."
                    styles={customSelectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    required
                  />
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-normal flex items-center gap-2">
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

                {/* Number of Persons */}
                <div className="space-y-2">
                  <label className=" text-sm font-medium text-normal flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Persons
                  </label>
                  <Select
                    value={selectedPersons}
                    onChange={setSelectedPersons}
                    options={personsOptions}
                    placeholder="Select persons..."
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
                    Search Rooms
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
