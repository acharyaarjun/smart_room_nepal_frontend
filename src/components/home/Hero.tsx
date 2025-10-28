"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import heroImage from "@/assets/images/home/hero.jpg";
import heroIconOne from "@/assets/images/home/hero-icon-one.jpg";
import heroIconTwo from "@/assets/images/home/hero-icon-two.jpg";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { SelectElement } from "@/components/common/form-element";
import { District } from "@/types/user/district";
import { useRouter } from "next/navigation";

interface HeroProps {
  districts: District[];
}

export default function Hero({ districts }: HeroProps) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedPersons, setSelectedPersons] = useState<string | null>(null);

  const locationOptions = useMemo(() => {
    return districts.map((district) => ({
      value: district.slug,
      label: district.name,
    }));
  }, [districts]);

  const roomTypeOptions = [
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "twin", label: "Twin Room" },
    { value: "suite", label: "Suite" },
    { value: "deluxe", label: "Deluxe Room" },
    { value: "family_room", label: "Family Room" },
    { value: "studio", label: "Studio" },
    { value: "penthouse", label: "Penthouse" },
    { value: "apartment", label: "Apartment" },
    { value: "1_bhk", label: "1 BHK" },
    { value: "2_bhk", label: "2 BHK" },
    { value: "3_bhk", label: "3 BHK" },
    { value: "4_bhk", label: "4 BHK" },
    { value: "5_bhk", label: "5 BHK" },
    { value: "shared_room", label: "Shared Room" },
    { value: "hostel", label: "Hostel" },
    { value: "paying_guest", label: "Paying Guest" },
    { value: "dormitory", label: "Dormitory" },
    { value: "homestay", label: "Homestay" },
    { value: "lodge", label: "Lodge" },
    { value: "cottage", label: "Cottage" },
    { value: "villa", label: "Villa" },
  ];

  const personsOptions = [
    { value: "1_person", label: "1 Person" },
    { value: "2_persons", label: "2 Persons" },
    { value: "3_persons", label: "3 Persons" },
    { value: "4_persons", label: "4 Persons" },
    { value: "5_persons", label: "5 Persons" },
    { value: "5+_persons", label: "5+ Persons" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    if (selectedLocation) params.append("district", selectedLocation);
    if (selectedRoomType) params.append("roomType", selectedRoomType);
    if (selectedPersons) params.append("maxCapacity", selectedPersons);

    // Navigate to rooms page with filters
    router.push(`/rooms?${params.toString()}`);
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

              {/* <div className="flex items-center gap-3">
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
              </div> */}
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
                <SelectElement
                  title="Location"
                  placeholder="Select location..."
                  value={selectedLocation}
                  name="location"
                  error={null}
                  onChange={setSelectedLocation}
                  onBlur={() => {}}
                  options={locationOptions}
                  isRequired
                />

                <SelectElement
                  title="Room Type"
                  placeholder="Select room type..."
                  value={selectedRoomType}
                  name="roomType"
                  error={null}
                  onChange={setSelectedRoomType}
                  onBlur={() => {}}
                  options={roomTypeOptions}
                  isRequired
                />

                <SelectElement
                  title="Persons"
                  placeholder="Select persons..."
                  value={selectedPersons}
                  name="persons"
                  error={null}
                  onChange={setSelectedPersons}
                  onBlur={() => {}}
                  options={personsOptions}
                  isRequired
                />

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
