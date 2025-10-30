"use client";
import React, { useState, useEffect } from "react";
import {
  RoomGallery,
  RoomAmenities,
  RoomDescription,
  RoomOwnerCard,
  RoomLocationMap,
  RoomRequestModal,
  RoomReviews,
} from "@/components/rooms/details";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaRulerCombined,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";
import { RoomDetails as RoomDetailsType } from "@/types/user/room";
import { getProxiedImageUrl } from "@/utils";
import { getSingleRoom, toggleWishlist } from "@/services/userService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Spinner } from "@/components/common";

interface RoomDetailsProps {
  slug: string;
}

export default function RoomDetails({ slug }: RoomDetailsProps) {
  const [room, setRoom] = useState<RoomDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Get user data from Redux store
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const isUserRole = user?.role === "user";
  const canRequestRoom = isAuthenticated && isUserRole && room?.isAvailable;

  // Fetch room details on component mount
  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getSingleRoom(slug);
        if (response.status === 200 && response.data) {
          setRoom(response.data);
          setIsWishlisted(response.data.isWishlisted);
        } else {
          setError("Room not found");
        }
      } catch (err: any) {
        console.error("Error fetching room details:", err);
        setError(err?.response?.data?.message || "Failed to load room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [slug]);

  const handleWishlistToggle = async () => {
    if (isTogglingWishlist || !room) return;

    const previousState = isWishlisted;
    setIsTogglingWishlist(true);

    try {
      const response = await toggleWishlist(room.slug);

      if (response.status === 200 || response.status === 201) {
        setIsWishlisted(!previousState);
        toast.success(
          previousState ? "Removed from wishlist" : "Added to wishlist"
        );
      }
    } catch (error: any) {
      setIsWishlisted(previousState);
      const errorMessage =
        error?.response?.data?.message || "Failed to update wishlist";
      toast.error(errorMessage);
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-8 lg:py-12">
        <div className="container">
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !room) {
    return (
      <section className="w-full py-8 lg:py-12">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-xl text-red-600 dark:text-red-400">
              {error || "Room not found"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Prepare images for gallery
  const galleryImages = [
    room.image?.url ? getProxiedImageUrl(room.image.url) : "/placeholder.jpg",
    ...room.roomMedias.map((media) =>
      media.media?.url
        ? getProxiedImageUrl(media.media.url)
        : "/placeholder.jpg"
    ),
  ];

  const highlights = [
    { icon: FaBed, text: room.roomType.replace("_", " ") },
    { icon: FaRulerCombined, text: room.maxCapacity.replace("_", " ") },
    { icon: FaMapMarkerAlt, text: room.district.name },
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
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                    {room.roomType.replace("_", " ")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={isTogglingWishlist}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isWishlisted
                        ? "bg-red-100 text-red-500 dark:bg-red-900/20"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <FaHeart />
                  </button>
                  {/* <button className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <FaShare />
                  </button> */}
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {room.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-medium">{room.address}</span>
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
              <RoomGallery images={galleryImages} />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <RoomDescription description={room.description} />
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <RoomAmenities amenities={room.roomAmenities} />
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Location & Nearby
              </h3>
              <RoomLocationMap lat={room.latitude} lng={room.longitude} />
            </div>

            {/* Availability & Rules */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  District
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex flex-col gap-2 text-blue-700 dark:text-blue-400">
                    <span className="font-bold text-lg">
                      {room.district.name}
                    </span>
                    {room.district.description && (
                      <p className="text-sm">{room.district.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-4">
              <RoomReviews roomSlug={room.slug} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-light dark:bg-dropdown rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="space-y-4">
                  {/* Availability Badge */}
                  {room.isAvailable ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <span className="text-green-700 dark:text-green-300 font-semibold text-sm">
                        ✓ Available
                      </span>
                    </div>
                  ) : (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <span className="text-red-700 dark:text-red-300 font-semibold text-sm">
                        ✗ Not Available
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs. {(room.offerPrice || room.price).toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400">
                      / {room.unit}
                    </span>
                  </div>
                  {room.offerPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        Rs. {room.price.toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                        Save Rs.{" "}
                        {(room.price - room.offerPrice).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Request Room Button */}
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      disabled={!canRequestRoom}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      title={
                        !isAuthenticated
                          ? "Please login to request this room"
                          : !isUserRole
                          ? "Only users can request rooms"
                          : !room.isAvailable
                          ? "This room is not available"
                          : "Request this room"
                      }
                    >
                      <FaPaperPlane />
                      {!isAuthenticated
                        ? "Login to Request"
                        : !isUserRole
                        ? "Only Users Can Request"
                        : !room.isAvailable
                        ? "Room Not Available"
                        : "Request Room"}
                    </button>

                    {isAuthenticated && !isUserRole && (
                      <p className="text-xs text-center text-amber-600 dark:text-amber-400">
                        Switch to user account to request rooms
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Card */}
              <RoomOwnerCard
                name={room.user.fullName}
                phone={room.user.userProfile.phone || "Not provided"}
                email={room.user.email}
                verified={room.user.userProfile.status === "active"}
                joinedDate={new Date(room.user.createdAt)
                  .getFullYear()
                  .toString()}
                avatar={
                  room.user.userProfile.avatar?.url
                    ? getProxiedImageUrl(room.user.userProfile.avatar.url)
                    : undefined
                }
              />

              {/* Quick Contact */}
              <div className="bg-light dark:bg-dropdown rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  {room.user.userProfile.phone && (
                    <>
                      <a
                        href={`tel:${room.user.userProfile.phone}`}
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                      >
                        <FaPhone className="text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          Call Now
                        </span>
                      </a>
                      <a
                        href={`https://wa.me/${room.user.userProfile.phone.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors duration-300"
                      >
                        <FaWhatsapp className="text-emerald-600 dark:text-emerald-400" />
                        <span className="font-medium text-emerald-700 dark:text-emerald-300">
                          WhatsApp
                        </span>
                      </a>
                    </>
                  )}
                  <a
                    href={`mailto:${room.user.email}`}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-300"
                  >
                    <FaEnvelope className="text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-700 dark:text-green-300">
                      Send Email
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

      {/* Room Request Modal */}
      <RoomRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        roomSlug={room.slug}
        roomUnit={room.unit}
        roomName={room.name}
        roomPrice={room.price}
        offerPrice={room.offerPrice}
      />
    </section>
  );
}
