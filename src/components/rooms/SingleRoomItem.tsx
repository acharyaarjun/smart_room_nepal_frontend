"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Room } from "@/types/user/room";
import Link from "next/link";
import { IconComponent } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import { toggleWishlist } from "@/services/userService";
import { toast } from "react-hot-toast";

type SingleRoomItemProps = {
  room: Room;
  isLong?: boolean;
};

export default function SingleRoomItem({
  room,
  isLong = false,
}: SingleRoomItemProps) {
  const [isWishlisted, setIsWishlisted] = useState(room.isWishlisted);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTogglingWishlist) return;

    const previousState = isWishlisted;
    setIsTogglingWishlist(true);

    try {
      await toggleWishlist(room.slug);
      setIsWishlisted(!previousState);
      toast.success(
        previousState ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (error: any) {
      // Revert state on error
      setIsWishlisted(previousState);
      const errorMessage =
        error?.response?.data?.message || "Failed to update wishlist";
      toast.error(errorMessage);
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

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
          src={
            room.image?.url
              ? getProxiedImageUrl(room.image.url)
              : "/placeholder.jpg"
          }
          alt={room.name}
          className="h-full w-full object-cover rounded-xl"
          fill
        />

        {/* Offer Price Badge */}
        {room.offerPrice && (
          <div className="absolute top-3 right-3 text-xs uppercase py-1 bg-danger font-semibold text-white px-2 rounded-md shadow-md">
            Sale
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
            <span>{room.district.name}</span>
          </div>

          <button
            onClick={handleWishlistToggle}
            disabled={isTogglingWishlist}
            className="text-gray-500 dark:text-gray-300 hover:text-success transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <FaBookmark className="text-success text-lg" />
            ) : (
              <FaRegBookmark className="text-lg" />
            )}
          </button>
        </div>

        {/* Title */}
        <Link
          href={`/rooms/${room.slug}`}
          className="font-bold text-lg md:text-xl text-gray-800 dark:text-white mb-2 line-clamp-1"
        >
          {room.name}
        </Link>

        {/* Short Description (only for long card) */}
        {isLong && room.shortDescription && (
          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {room.shortDescription}
          </p>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mb-4">
          {visibleAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center gap-1 text-normal text-sm"
            >
              <IconComponent icon={amenity.icon} className="" />
              <span>{amenity.name}</span>
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
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              {room.offerPrice ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">
                      Rs.{room.offerPrice}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      /{room.unit}
                    </span>
                  </div>
                  {/* <span className="text-gray-500 dark:text-gray-400 text-sm line-through">
                    Rs.{room.price}
                  </span> */}
                </>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    Rs.{room.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    /{room.unit}
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/rooms/${room.slug}`}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
