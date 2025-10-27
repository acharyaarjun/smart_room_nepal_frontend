"use client";
import { RoomData } from "@/data/room";
import { Room } from "@/types/room/room";
import React, { useState, useMemo } from "react";
import { SingleRoomItem } from "@/components/rooms";
import { AnimatePresence } from "framer-motion";
import {
  RoomListingHeader,
  HorizontalFilters,
  SidebarFilters,
} from "@/components/rooms";
import { Pagination } from "@/components/common";
import { Filters } from "@/types/room/filters";
import { District } from "@/types/user/district";
import { Amenity } from "@/types/user/amenity";
import { IconComponent } from "@/components/common";

interface RoomListingProps {
  districts: District[];
  amenities: Amenity[];
}

export default function RoomListing({
  districts,
  amenities,
}: RoomListingProps) {
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

  // Transform amenities to include icons
  const availableAmenities = useMemo(() => {
    return amenities.map((amenity) => ({
      id: amenity.id.toString(),
      label: amenity.name,
      icon: IconComponent,
      iconName: amenity.icon,
    }));
  }, [amenities]);

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
              districts={districts}
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
                availableAmenities={availableAmenities}
                districts={districts}
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
