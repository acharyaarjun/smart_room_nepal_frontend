"use client";
import React, { useState } from "react";
import {
  RoomGallery,
  RoomAmenities,
  RoomDescription,
  RoomOwnerCard,
  RoomLocationMap,
} from "@/components/rooms/details";
import {
  FaStar,
  FaHeart,
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaShieldAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

import roomImageOne from "@/assets/images/rooms/1.jpg";
import roomImageTwo from "@/assets/images/rooms/2.jpg";
import roomImageThree from "@/assets/images/rooms/3.jpg";
import roomImageFour from "@/assets/images/rooms/4.jpg";
import { RoomDetails as RoomDetailsType } from "@/types/room/details";

export default function RoomDetails() {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const roomData: RoomDetailsType = {
    title: "Luxurious 2BHK Apartment with Modern Amenities",
    location: "Baneshwor, Kathmandu",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 156,
    roomType: "2 BHK Apartment",
    area: "850 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    availability: "Available from Dec 1, 2024",
    verified: true,
    images: [
      roomImageOne.src,
      roomImageTwo.src,
      roomImageThree.src,
      roomImageFour.src,
      roomImageOne.src,
      roomImageTwo.src,
    ],
  };

  const highlights = [
    { icon: FaBed, text: "2 Spacious Bedrooms" },
    { icon: FaBath, text: "2 Modern Bathrooms" },
    { icon: FaRulerCombined, text: "850 sq ft Area" },
    { icon: FaShieldAlt, text: "Verified Property" },
  ];

  return (
    <section className="w-full py-8 lg:py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {roomData.verified && (
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-sm font-medium">
                      <FaCircleCheck className="text-xs" />
                      Verified
                    </div>
                  )}
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isLiked
                        ? "bg-red-100 text-red-500 dark:bg-red-900/20"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaHeart />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <FaShare />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {roomData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-medium">{roomData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(roomData.rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{roomData.rating}</span>
                  <span className="text-sm">({roomData.reviews} reviews)</span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dropdown rounded-lg"
                  >
                    <highlight.icon className="text-primary text-lg" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {highlight.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <RoomGallery images={roomData.images} />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <RoomDescription description="Experience luxury living in this stunning 2BHK apartment located in the heart of Baneshwor, Kathmandu. This modern space features contemporary design, premium finishes, and all the amenities you need for comfortable living. Perfect for families, professionals, or students looking for a premium accommodation experience." />
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <RoomAmenities />
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Location & Nearby
              </h3>
              <RoomLocationMap lat={27.7172} lng={85.324} />
            </div>

            {/* Availability & Rules */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Availability
                </h3>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <FaCalendarAlt />
                    <span className="font-medium">{roomData.availability}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  House Rules
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm">No smoking inside</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm">Pets allowed</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm">Visitors allowed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-light dark:bg-dropdown rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs. {roomData.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400">
                      / month
                    </span>
                  </div>
                  {roomData.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        Rs. {roomData.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                        Save Rs.{" "}
                        {(
                          roomData.originalPrice - roomData.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                      Contact Owner
                    </button>
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 rounded-lg transition-colors duration-300">
                      Schedule Visit
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Response time: Usually within 2 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner Card */}
              <RoomOwnerCard
                name="Ram Bahadur Shrestha"
                phone="+977 9812345678"
                email="ram.shrestha@example.com"
                verified={true}
                responseTime="2 hours"
                properties={12}
                joinedDate="2020"
              />

              {/* Quick Contact */}
              <div className="bg-light dark:bg-dropdown rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+9779812345678"
                    className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                  >
                    <FaPhone className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">
                      Call Now
                    </span>
                  </a>
                  <a
                    href="mailto:ram.shrestha@example.com"
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-300"
                  >
                    <FaEnvelope className="text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-700 dark:text-green-300">
                      Send Email
                    </span>
                  </a>
                  <a
                    href="https://wa.me/9779812345678"
                    className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Safety Tips
                </h3>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>• Meet the owner in person before making payment</li>
                  <li>• Verify property documents</li>
                  <li>• Never pay advance without visiting</li>
                  <li>• Report suspicious listings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
