"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaFilter, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { getAllRoomReviewsForHost } from "@/services/reviewService";
import { Review } from "@/types/host/review";
import { toast } from "react-hot-toast";
import { Pagination, Spinner } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import { getAllRoomsForHost } from "@/services/roomService";
import { Room } from "@/types/host/room";

export default function HostReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(
    undefined
  );
  const [roomFilter, setRoomFilter] = useState("");

  const fetchRooms = async () => {
    setLoadingRooms(true);
    try {
      const response = await getAllRoomsForHost({
        page: 1,
        size: 100,
      });
      setRooms(response.data.data || []);
    } catch (error: any) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoadingRooms(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomReviewsForHost({
        page: currentPage,
        size: 10,
        search: searchTerm,
        rating: ratingFilter,
        room: roomFilter,
        sort: "createdAt",
        order: "desc",
      });

      setReviews(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch reviews";
      toast.error(errorMessage);
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, ratingFilter, roomFilter]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Reviews
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {reviews.length}
          </p>
        </div>
        <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Average Rating
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-3xl font-bold text-primary">
              {calculateAverageRating()}
            </p>
            <FaStar className="text-yellow-400 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            5 Star Reviews
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {reviews.filter((r) => r.rating === 5).length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-primary">Reviews</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Room Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={roomFilter}
                onChange={(e) => {
                  setRoomFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 lg:max-w-40 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none w-full sm:w-48"
                disabled={loadingRooms}
              >
                <option value="">All Rooms</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.slug}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={ratingFilter ?? ""}
                onChange={(e) => {
                  setRatingFilter(
                    e.target.value ? Number(e.target.value) : undefined
                  );
                  setCurrentPage(1);
                }}
                className="pl-10 lg:max-w-40 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none w-full sm:w-48"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-normal text-lg">No reviews found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your rooms haven&apos;t received any reviews yet
            </p>
          </div>
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  {/* User Info */}
                  <div className="flex items-start gap-3">
                    {review.roomRequest.user.userProfile.avatar ? (
                      <Image
                        src={getProxiedImageUrl(
                          review.roomRequest.user.userProfile.avatar.url
                        )}
                        alt={review.roomRequest.user.fullName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                        {review.roomRequest.user.fullName.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.roomRequest.user.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        @{review.roomRequest.user.username}
                      </p>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white text-wrap break-words line-clamp-1">
                      {review.roomRequest.room.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rs.{" "}
                      {(
                        review.roomRequest.room.offerPrice ||
                        review.roomRequest.room.price
                      ).toLocaleString()}{" "}
                      / {review.roomRequest.room.unit}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Review Message */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {review.message}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <FaCalendarAlt />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
