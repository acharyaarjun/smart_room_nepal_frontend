"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSingleRoomForHost } from "@/services/roomService";
import { Room } from "@/types/host/room";
import { Spinner } from "@/components/common";
import { AppConsts, getProxiedImageUrl } from "@/utils";
import {
  FiArrowLeft,
  FiEdit2,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiImage,
  FiList,
} from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import RoomAmenitiesTab from "./RoomAmenitiesTab";
import RoomMediaTab from "./RoomMediaTab";

interface Props {
  slug: string;
}

type Tab = "details" | "amenities" | "media";

export default function RoomDetail({ slug }: Props) {
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("details");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await getSingleRoomForHost(slug);
        if (response.status === 200) {
          setRoom(response.data);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        toast.error("Failed to load room details");
        router.push(AppConsts.DASHBOARD_ROOMS_URL);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchRoom();
    }
  }, [slug, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "MAINTENANCE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">Room not found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(AppConsts.DASHBOARD_ROOMS_URL)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-normal">{room.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {room.shortDescription}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
              room.roomStatus
            )}`}
          >
            {formatStatus(room.roomStatus)}
          </span>
          <button
            onClick={() => router.push(`/dashboard/rooms/edit?slug=${slug}`)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit Room
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-normal"
            }`}
          >
            <FiList className="w-4 h-4" />
            Details
          </button>
          <button
            onClick={() => setActiveTab("amenities")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "amenities"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-normal"
            }`}
          >
            <FiList className="w-4 h-4" />
            Amenities
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "media"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-normal"
            }`}
          >
            <FiImage className="w-4 h-4" />
            Media
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Image */}
          <div className="bg-white dark:bg-dropdown rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="relative w-full h-[500px] bg-gray-200 dark:bg-gray-700">
              {room.image?.url ? (
                <Image
                  src={getProxiedImageUrl(room.image.url)}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <FiImage className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>No Image</p>
                  </div>
                </div>
              )}
              {room.isFeatured && (
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg">
                  ⭐ Featured
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-dropdown rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-normal mb-4 flex items-center gap-2">
              <FiList className="w-5 h-5 text-primary" />
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {room.description}
            </p>
          </div>

          {/* Pricing & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing */}
            <div className="bg-white dark:bg-dropdown rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-normal mb-4 flex items-center gap-2">
                <FiDollarSign className="w-5 h-5 text-primary" />
                Pricing
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Price per {room.unit}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-primary">
                      NPR {room.offerPrice || room.price}
                    </p>
                    {room.offerPrice && (
                      <span className="text-lg line-through text-gray-400">
                        NPR {room.price}
                      </span>
                    )}
                  </div>
                  {room.offerPrice && (
                    <div className="mt-2 inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      Save NPR {room.price - room.offerPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Room Type & Capacity */}
            <div className="bg-white dark:bg-dropdown rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-normal mb-4 flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-primary" />
                Room Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FiList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Room Type
                    </p>
                    <p className="font-semibold text-normal capitalize">
                      {room.roomType.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Max Capacity
                    </p>
                    <p className="font-semibold text-normal capitalize">
                      {room.maxCapacity.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-dropdown rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-normal mb-4 flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-primary" />
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    District
                  </p>
                  <p className="text-lg font-semibold text-normal capitalize">
                    {room.district.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Address
                  </p>
                  <p className="text-normal">{room.address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    GPS Coordinates
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Latitude:
                      </span>
                      <span className="font-mono text-sm text-normal">
                        {room.latitude}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Longitude:
                      </span>
                      <span className="font-mono text-sm text-normal">
                        {room.longitude}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${room.latitude},${room.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
                  >
                    <FiMapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "amenities" && <RoomAmenitiesTab roomSlug={slug} />}
      {activeTab === "media" && <RoomMediaTab roomSlug={slug} />}
    </div>
  );
}
