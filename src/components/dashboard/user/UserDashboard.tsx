"use client";
import { useState, useEffect } from "react";
import { DefaultSkeleton } from "@/components/common";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserDashboard } from "@/services/dashboardService";
import { Dashboard } from "@/types/user/dashboard";
import { toast } from "react-hot-toast";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaPlay,
  FaFlagCheckered,
  FaHeart,
  FaEye,
  FaStar,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await getUserDashboard();
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch dashboard data";
      toast.error(errorMessage);
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = dashboardData
    ? [
        {
          title: "Total Requests",
          value: dashboardData.stats.totalRequests,
          icon: FaClipboardList,
          color: "bg-blue-500",
          lightBg: "bg-blue-50 dark:bg-blue-900/20",
          textColor: "text-blue-600 dark:text-blue-400",
        },
        {
          title: "Pending Requests",
          value: dashboardData.stats.pendingRequests,
          icon: FaClock,
          color: "bg-yellow-500",
          lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
          textColor: "text-yellow-600 dark:text-yellow-400",
        },
        {
          title: "Approved Requests",
          value: dashboardData.stats.approvedRequests,
          icon: FaCheckCircle,
          color: "bg-green-500",
          lightBg: "bg-green-50 dark:bg-green-900/20",
          textColor: "text-green-600 dark:text-green-400",
        },
        {
          title: "Rejected Requests",
          value: dashboardData.stats.rejectedRequests,
          icon: FaTimesCircle,
          color: "bg-red-500",
          lightBg: "bg-red-50 dark:bg-red-900/20",
          textColor: "text-red-600 dark:text-red-400",
        },
        {
          title: "Canceled Requests",
          value: dashboardData.stats.canceledRequests,
          icon: FaBan,
          color: "bg-gray-500",
          lightBg: "bg-gray-50 dark:bg-gray-900/20",
          textColor: "text-gray-600 dark:text-gray-400",
        },
        {
          title: "Ongoing Requests",
          value: dashboardData.stats.ongoingRequests,
          icon: FaPlay,
          color: "bg-indigo-500",
          lightBg: "bg-indigo-50 dark:bg-indigo-900/20",
          textColor: "text-indigo-600 dark:text-indigo-400",
        },
        {
          title: "Completed Requests",
          value: dashboardData.stats.completedRequests,
          icon: FaFlagCheckered,
          color: "bg-purple-500",
          lightBg: "bg-purple-50 dark:bg-purple-900/20",
          textColor: "text-purple-600 dark:text-purple-400",
        },
        {
          title: "Wishlisted Rooms",
          value: dashboardData.stats.totalWishlists,
          icon: FaHeart,
          color: "bg-pink-500",
          lightBg: "bg-pink-50 dark:bg-pink-900/20",
          textColor: "text-pink-600 dark:text-pink-400",
        },
        {
          title: "Recently Viewed",
          value: dashboardData.stats.totalRecentlyViewed,
          icon: FaEye,
          color: "bg-cyan-500",
          lightBg: "bg-cyan-50 dark:bg-cyan-900/20",
          textColor: "text-cyan-600 dark:text-cyan-400",
        },
        {
          title: "Total Reviews",
          value: dashboardData.stats.totalReviews,
          icon: FaStar,
          color: "bg-amber-500",
          lightBg: "bg-amber-50 dark:bg-amber-900/20",
          textColor: "text-amber-600 dark:text-amber-400",
        },
      ]
    : [];

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      canceled:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
      on_going:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      completed:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.toUpperCase().replace("_", " ")}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* User Dashboard Header */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-normal">
              Manage your bookings and explore available rooms.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.lightBg} p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Requests */}
          {dashboardData && dashboardData.recentRequests.length > 0 && (
            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Requests
                </h2>
                <Link
                  href="/dashboard/user/bookings"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {dashboardData.recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Room Image */}
                      {request.room.image ? (
                        <Image
                          src={getProxiedImageUrl(request.room.image.url)}
                          alt={request.room.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <FaHome className="text-gray-400 text-2xl" />
                        </div>
                      )}

                      {/* Request Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {request.room.name}
                          </h3>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{request.room.district.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Price:</span>
                            <span>
                              Rs.{" "}
                              {(
                                request.acceptedPrice || request.price
                              ).toLocaleString()}{" "}
                              / {request.room.unit}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Requested:</span>
                            <span>{formatDate(request.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/rooms"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-custom p-6 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Explore Rooms</h3>
              <p className="text-sm text-white/90">
                Browse available rooms across Nepal
              </p>
            </Link>
            <Link
              href="/dashboard/user/bookings"
              className="bg-white dark:bg-dropdown hover:shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg shadow-custom p-6 transition-all"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                My Bookings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View and manage your room requests
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
