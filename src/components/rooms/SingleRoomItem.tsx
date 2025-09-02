import React, { useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { Room } from "@/types/room/room";

type SingleRoomItemProps = {
  room: Room;
  isLong?: boolean;
};

export default function SingleRoomItem({
  room,
  isLong = false,
}: SingleRoomItemProps) {
  const [saved, setSaved] = useState(false);

  // Show all amenities for long card, else first 2
  const visibleAmenities = isLong ? room.amenities : room.amenities.slice(0, 2);
  const hiddenCount = room.amenities.length - visibleAmenities.length;

  return (
    <div
      className={`bg-white dark:bg-dropdown shadow-custom rounded-xl p-2 hover:shadow-lg transition-shadow duration-300 ${
        isLong ? "flex flex-col lg:flex-row h-auto" : ""
      }`}
    >
      {/* Image Section */}
      <div
        className={`${
          isLong
            ? "w-full lg:w-1/3 h-[250px] lg:h-auto relative rounded-xl"
            : "w-full h-[250px] relative"
        }`}
      >
        <Image
          src={room.image}
          alt={room.title}
          className="h-full w-full object-cover rounded-xl"
          fill
        />

        {/* Featured Badge */}
        {room.featured && (
          <div className="absolute top-3 right-3 text-xs uppercase py-1 bg-danger font-semibold text-white px-2 rounded-md shadow-md">
            Featured
          </div>
        )}

        {/* Rating badge */}
        {room.rating && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
            <FaStar className="text-yellow-400" />
            {room.rating}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div
        className={`${
          isLong ? "w-full lg:w-2/3 p-4 lg:py-2 mt-4 lg:mt-0" : "p-4"
        }`}
      >
        {/* Location with Save Icon */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
            <FaMapMarkerAlt className="text-xs" />
            <span>{room.location}</span>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className="text-gray-500 dark:text-gray-300 hover:text-success transition-colors"
          >
            {saved ? (
              <FaBookmark className="text-success text-lg" />
            ) : (
              <FaRegBookmark className="text-lg" />
            )}
          </button>
        </div>

        {/* Title */}
        <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-white mb-2 line-clamp-1">
          {room.title}
        </h2>

        {/* Short Description (only for long card) */}
        {isLong && room.shortDescription && (
          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {room.shortDescription}
          </p>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mb-4">
          {visibleAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-normal text-sm"
            >
              <amenity.icon className="" />
              <span>{amenity.label}</span>
            </div>
          ))}

          {/* Show "more" indicator only for small / default cards */}
          {!isLong && hiddenCount > 0 && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
              +{hiddenCount} more
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              Rs.{room.price}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              /{room.per}
            </span>
          </div>

          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
