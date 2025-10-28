"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { getAllReviews } from "@/services/roomService";
import { Review } from "@/types/user/room";
import defaultAvatar from "@/assets/images/users/user-one.jpg";
import { getProxiedImageUrl } from "@/utils";

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getAllReviews({
        page: 1,
        size: 6,
        sort: "createdAt",
        order: "DESC",
      });

      if (response.status === 200 && response.data) {
        setReviews(response.data.data);
        // Calculate average rating
        if (response.data.data.length > 0) {
          const avg =
            response.data.data.reduce(
              (sum: number, review: Review) => sum + review.rating,
              0
            ) / response.data.data.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real experiences from real people who found their perfect room
              through SmartRoom Nepal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Real experiences from real people who found their perfect room
            through SmartRoom Nepal
          </p>
          {averageRating > 0 && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-gray-600 dark:text-gray-400">
                ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/20 dark:text-primary/10">
                <FaQuoteLeft className="text-3xl" />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      review.roomRequest.user.userProfile.avatar
                        ? getProxiedImageUrl(
                            review.roomRequest.user.userProfile.avatar.path
                          )
                        : defaultAvatar
                    }
                    alt={review.roomRequest.user.fullName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.roomRequest.user.fullName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{review.roomRequest.user.username}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              {/* Review Message */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                {review.message}
              </p>

              {/* Room Info */}
              <Link
                href={`/rooms/${review.roomRequest.room.slug}`}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors text-wrap break-words line-clamp-1"
              >
                View {review.roomRequest.room.name} →
              </Link>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        {reviews.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/rooms"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Explore All Rooms
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
