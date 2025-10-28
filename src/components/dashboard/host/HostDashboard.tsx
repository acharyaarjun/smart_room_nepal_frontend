"use client";
import { useState, useEffect } from "react";
import { DefaultSkeleton } from "@/components/common";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getHostDashboard } from "@/services/dashboardService";
import { Dashboard } from "@/types/host/dashboard";
import { toast } from "react-hot-toast";
import {
  FaHome,
  FaCheckCircle,
  FaClock,
  FaTools,
  FaBan,
  FaEyeSlash,
  FaStar as FaStarSolid,
  FaClipboardList,
  FaTimesCircle,
  FaPlay,
  FaFlagCheckered,
  FaStar,
  FaCoins,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { RiVipCrownLine } from "react-icons/ri";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function HostDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await getHostDashboard();
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

  const roomStatsCards = dashboardData
    ? [
        {
          title: "Total Rooms",
          value: dashboardData.stats.totalRooms,
          icon: FaHome,
          color: "bg-blue-500",
          lightBg: "bg-blue-50 dark:bg-blue-900/20",
          textColor: "text-blue-600 dark:text-blue-400",
        },
        {
          title: "Approved Rooms",
          value: dashboardData.stats.approvedRooms,
          icon: FaCheckCircle,
          color: "bg-green-500",
          lightBg: "bg-green-50 dark:bg-green-900/20",
          textColor: "text-green-600 dark:text-green-400",
        },
        {
          title: "Pending Rooms",
          value: dashboardData.stats.pendingRooms,
          icon: FaClock,
          color: "bg-yellow-500",
          lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
          textColor: "text-yellow-600 dark:text-yellow-400",
        },
        {
          title: "Maintenance",
          value: dashboardData.stats.maintenanceRooms,
          icon: FaTools,
          color: "bg-orange-500",
          lightBg: "bg-orange-50 dark:bg-orange-900/20",
          textColor: "text-orange-600 dark:text-orange-400",
        },
        {
          title: "Disabled by Admin",
          value: dashboardData.stats.disabledByAdminRooms,
          icon: FaBan,
          color: "bg-red-500",
          lightBg: "bg-red-50 dark:bg-red-900/20",
          textColor: "text-red-600 dark:text-red-400",
        },
        {
          title: "Disabled by Owner",
          value: dashboardData.stats.disabledByOwnerRooms,
          icon: FaEyeSlash,
          color: "bg-gray-500",
          lightBg: "bg-gray-50 dark:bg-gray-900/20",
          textColor: "text-gray-600 dark:text-gray-400",
        },
        {
          title: "Featured Rooms",
          value: dashboardData.stats.featuredRooms,
          icon: FaStarSolid,
          color: "bg-amber-500",
          lightBg: "bg-amber-50 dark:bg-amber-900/20",
          textColor: "text-amber-600 dark:text-amber-400",
        },
      ]
    : [];

  const requestStatsCards = dashboardData
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
          title: "Pending",
          value: dashboardData.stats.pendingRequests,
          icon: FaClock,
          color: "bg-yellow-500",
          lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
          textColor: "text-yellow-600 dark:text-yellow-400",
        },
        {
          title: "Approved",
          value: dashboardData.stats.approvedRequests,
          icon: FaCheckCircle,
          color: "bg-green-500",
          lightBg: "bg-green-50 dark:bg-green-900/20",
          textColor: "text-green-600 dark:text-green-400",
        },
        {
          title: "Rejected",
          value: dashboardData.stats.rejectedRequests,
          icon: FaTimesCircle,
          color: "bg-red-500",
          lightBg: "bg-red-50 dark:bg-red-900/20",
          textColor: "text-red-600 dark:text-red-400",
        },
        {
          title: "Ongoing",
          value: dashboardData.stats.ongoingRequests,
          icon: FaPlay,
          color: "bg-indigo-500",
          lightBg: "bg-indigo-50 dark:bg-indigo-900/20",
          textColor: "text-indigo-600 dark:text-indigo-400",
        },
        {
          title: "Completed",
          value: dashboardData.stats.completedRequests,
          icon: FaFlagCheckered,
          color: "bg-purple-500",
          lightBg: "bg-purple-50 dark:bg-purple-900/20",
          textColor: "text-purple-600 dark:text-purple-400",
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
          {/* Host Dashboard Header */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-normal">
              Manage your rooms, bookings, and membership from your host
              dashboard.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <FaCoins className="w-8 h-8 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  Credits
                </span>
              </div>
              <p className="text-3xl font-bold">
                {dashboardData?.stats.availableCredits || 0}
              </p>
              <p className="text-sm text-white/80 mt-1">Available credits</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <FaStar className="w-8 h-8 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  Reviews
                </span>
              </div>
              <p className="text-3xl font-bold">
                {dashboardData?.stats.totalReviews || 0}
              </p>
              <p className="text-sm text-white/80 mt-1">
                Avg: {dashboardData?.stats.averageRating.toFixed(1) || "0.0"} ★
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <FaHome className="w-8 h-8 text-white/80" />
                <span className="text-sm font-medium text-white/80">Rooms</span>
              </div>
              <p className="text-3xl font-bold">
                {dashboardData?.stats.totalRooms || 0}
              </p>
              <p className="text-sm text-white/80 mt-1">Total listings</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <FaClipboardList className="w-8 h-8 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  Requests
                </span>
              </div>
              <p className="text-3xl font-bold">
                {dashboardData?.stats.totalRequests || 0}
              </p>
              <p className="text-sm text-white/80 mt-1">Total bookings</p>
            </div>
          </div>

          {/* Room Statistics */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Room Statistics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  gap-4">
              {roomStatsCards.map((stat, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className={`${stat.lightBg} p-3 rounded-lg mb-3 w-fit`}>
                    <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Request Statistics */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Booking Requests
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {requestStatsCards.map((stat, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className={`${stat.lightBg} p-3 rounded-lg mb-3 w-fit`}>
                    <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          {dashboardData && dashboardData.recentRequests.length > 0 && (
            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Requests
                </h2>
                <Link
                  href="/dashboard/host/bookings"
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
                      {/* User Avatar */}
                      {request.user.userProfile.avatar ? (
                        <Image
                          src={getProxiedImageUrl(
                            request.user.userProfile.avatar.url
                          )}
                          alt={request.user.fullName}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                          {request.user.fullName.charAt(0)}
                        </div>
                      )}

                      {/* Request Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {request.user.fullName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.room.name}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <FaDollarSign className="text-primary" />
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

          {/* Top Rated Rooms */}
          {dashboardData && dashboardData.topRatedRooms.length > 0 && (
            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Top Rated Rooms
                </h2>
                <Link
                  href="/dashboard/host/rooms"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View All Rooms
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.topRatedRooms.map((room) => (
                  <div
                    key={room.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Room Image */}
                    <div className="relative h-48">
                      {room.image ? (
                        <Image
                          src={getProxiedImageUrl(room.image.url)}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <FaHome className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      {room.isFeatured && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaStarSolid className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Room Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
                        {room.name}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary" />
                          <span>{room.district.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Rs. {room.price.toLocaleString()} / {room.unit}
                          </span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {room.roomType.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/host/rooms/add"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-custom p-6 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Add New Room</h3>
              <p className="text-sm text-white/90">
                List a new room to increase your bookings
              </p>
            </Link>
            <Link
              href="/dashboard/host/membership"
              className="bg-white dark:bg-dropdown hover:shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg shadow-custom p-6 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <RiVipCrownLine className="text-amber-500 w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Membership
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your credits and upgrade plan
              </p>
            </Link>
            <Link
              href="/dashboard/host/bookings"
              className="bg-white dark:bg-dropdown hover:shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg shadow-custom p-6 transition-all"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Manage Bookings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review and respond to booking requests
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
