"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { getAllRoomReviews } from "@/services/roomService";
import { Review } from "@/types/user/room";
import { toast } from "react-hot-toast";
import { Pagination, Spinner } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";

interface RoomReviewsProps {
  roomSlug: string;
}

export default function RoomReviews({ roomSlug }: RoomReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomReviews({
        page: currentPage,
        size: 5,
        room: roomSlug,
        sort: "createdAt",
        order: "desc",
      });

      setReviews(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalReviews(response.data.total || 0);

      // Calculate average rating
      if (response.data.data && response.data.data.length > 0) {
        const sum = response.data.data.reduce(
          (acc: number, review: Review) => acc + review.rating,
          0
        );
        setAverageRating(sum / response.data.data.length);
      }
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
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, roomSlug]);

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

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Guest Reviews
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white dark:bg-dropdown rounded-2xl shadow-custom border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <FaStar className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Reviews Yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Be the first to share your experience! Book this room and leave a
              review to help others make their decision.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Review Summary */}
          <div className="bg-white dark:bg-dropdown rounded-2xl shadow-custom border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 pr-6">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex gap-1 mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {getRatingDistribution().map((count, index) => {
                  const rating = 5 - index;
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                        {rating}★
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-dropdown rounded-2xl shadow-custom border border-gray-200 dark:border-gray-700 p-6 space-y-4"
              >
                {/* User Info */}
                <div className="flex items-start gap-4">
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
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.roomRequest.user.fullName}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{review.roomRequest.user.username}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {review.rating}.0
                  </span>
                </div>

                {/* Review Message */}
                <p className="text-gray-700 dark:text-gray-300">
                  {review.message}
                </p>
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
  );
}
