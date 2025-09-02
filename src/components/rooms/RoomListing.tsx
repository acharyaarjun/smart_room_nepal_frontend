"use client";
import { RoomData } from "@/data/room";
import { Room } from "@/types/room/room";
import React, { useState } from "react";
import { SingleRoomItem } from "@/components/rooms";
import { AnimatePresence } from "framer-motion";
import {
  RoomListingHeader,
  HorizontalFilters,
  SidebarFilters,
} from "@/components/rooms";
import {
  FaCar,
  FaShieldAlt,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import { Pagination } from "@/components/common";
import { Filters } from "@/types/room/filters";

const availableAmenities = [
  { id: "wifi", label: "WiFi", icon: FaWifi },
  { id: "parking", label: "Parking", icon: FaCar },
  { id: "ac", label: "AC", icon: FaSnowflake },
  { id: "kitchen", label: "Kitchen", icon: FaUtensils },
  { id: "tv", label: "TV", icon: FaTv },
  { id: "security", label: "Security", icon: FaShieldAlt },
];

export default function RoomListing() {
  const [isLongView, setIsLongView] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    amenities: [],
    locations: [],
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      amenities: [],
      locations: [],
    });
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(RoomData.length / itemsPerPage);

  const paginatedRooms = RoomData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="room-listing" className="w-full py-12">
      <div className="container">
        <RoomListingHeader
          isLongView={isLongView}
          setIsLongView={setIsLongView}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          totalRooms={RoomData.length}
        />

        <AnimatePresence>
          {!isLongView && showFilters && (
            <HorizontalFilters
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
              setShowFilters={setShowFilters}
              availableAmenities={availableAmenities}
            />
          )}
        </AnimatePresence>

        <div className="flex gap-8">
          {isLongView && (
            <div className="w-1/4 hidden lg:block">
              <SidebarFilters
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
            </div>
          )}

          <div className={`${isLongView ? "w-full lg:w-3/4" : "w-full"}`}>
            <div
              className={`grid gap-6 ${
                isLongView
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {paginatedRooms.map((room: Room) => (
                <SingleRoomItem key={room.id} room={room} isLong={isLongView} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
