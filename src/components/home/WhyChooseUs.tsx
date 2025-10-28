"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import whyChooseUsImage from "@/assets/images/home/why-choose-us.jpg";
import { FaStar } from "react-icons/fa";
import { FaHome, FaShieldAlt, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import { getAllReviews } from "@/services/roomService";
import { Review } from "@/types/user/room";
import { getProxiedImageUrl } from "@/utils";

export default function WhyChooseUs() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getAllReviews({
        page: 1,
        size: 3, // Get top 3 reviews for avatars
        sort: "rating",
        order: "DESC",
      });

      if (response.status === 200 && response.data) {
        setReviews(response.data.data);
        setTotalReviews(response.data.totalItems);

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

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}K+`;
    }
    return `${count}+`;
  };

  return (
    <section id="why-choose-us" className="w-full py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="image h-full">
            <div className="h-full lg:pr-16 lg:pb-16 relative">
              <div
                className="absolute h-[90%] w-[90%] bottom-0 right-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, #6b7280 1px, transparent 1px),
                    radial-gradient(circle, #6b7280 1px, transparent 1px),
                    radial-gradient(circle, #6b7280 1px, transparent 1px)
                    `,
                  backgroundSize: "12px 12px, 12px 12px, 12px 12px",
                  backgroundPosition: "6px 6px, right bottom, right top",
                  backgroundRepeat: "repeat, repeat-x, repeat-y",
                }}
              ></div>

              {/* Main image */}
              <Image
                src={whyChooseUsImage}
                alt="SmartRoom Nepal - Best room finding platform"
                layout="responsive"
                width={500}
                height={300}
                className="h-full w-full rounded-2xl relative z-10"
              />

              {/* Card overlay */}
              <div className="absolute bottom-23 left-6 w-[300px] bg-white dark:bg-dropdown z-20 rounded-lg overflow-hidden px-5 py-3 shadow-lg">
                {loading ? (
                  // Loading skeleton
                  <div className="animate-pulse">
                    <div className="w-full flex justify-between font-medium text-sm mb-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="w-full flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full flex justify-between font-medium text-sm">
                      <span>Happy Clients</span>
                      <span>Rating</span>
                    </div>

                    <div className="w-full flex justify-between items-center mt-2">
                      {/* Avatars */}
                      <div className="w-full flex justify-start items-center">
                        {reviews.length > 0 ? (
                          <>
                            {reviews.slice(0, 3).map((review, index) => (
                              <div
                                key={review.id}
                                className="w-10 h-10 rounded-full flex justify-center items-center border-2 border-white dark:border-gray-800"
                                style={{
                                  marginLeft: index > 0 ? "-12px" : "0",
                                }}
                              >
                                {review.roomRequest.user.userProfile.avatar ? (
                                  <Image
                                    src={getProxiedImageUrl(
                                      review.roomRequest.user.userProfile.avatar
                                        .path
                                    )}
                                    alt={review.roomRequest.user.fullName}
                                    height={40}
                                    width={40}
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                                    {review.roomRequest.user.fullName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </div>
                                )}
                              </div>
                            ))}
                            {totalReviews > 3 && (
                              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-gray-200 font-semibold text-xs -ml-3 border-2 border-white dark:border-gray-800">
                                {formatCount(totalReviews)}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            No reviews yet
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="font-bold flex justify-center items-center gap-1">
                        {averageRating > 0 ? averageRating : "N/A"}{" "}
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <h1 className="font-bold text-5xl capitalize">
              Find your perfect room in Nepal!
            </h1>
            <p className="my-10 text-normal">
              SmartRoom Nepal is your trusted platform for finding and renting
              quality rooms across Nepal. We connect tenants with verified
              landlords, ensuring safe, affordable, and comfortable living
              spaces tailored to your needs.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full my-2">
                  <FaHome className="text-xl" />
                </div>
                <h4 className="font-bold">Verified Properties</h4>
                <p className="text-normal">
                  All rooms are verified and inspected to ensure quality,
                  safety, and accurate listings for your peace of mind.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full my-2">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h4 className="font-bold">Secure Transactions</h4>
                <p className="text-normal">
                  Safe and secure payment processing with legal documentation
                  support for hassle-free rental agreements.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full my-2">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <h4 className="font-bold">Prime Locations</h4>
                <p className="text-normal">
                  Rooms available in prime locations across Kathmandu, Pokhara,
                  and other major cities in Nepal with great connectivity.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full my-2">
                  <FaHeadset className="text-xl" />
                </div>
                <h4 className="font-bold">24/7 Support</h4>
                <p className="text-normal">
                  Round-the-clock customer support to assist you with any
                  queries or issues during your room search journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
