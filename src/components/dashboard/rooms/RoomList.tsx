"use client";
import React, { useState, useEffect } from "react";
import { getAllRoomsForHost } from "@/services/roomService";
import { Room } from "@/types/host/room";
import RoomCard from "./RoomCard";
import { DefaultSkeleton, Pagination } from "@/components/common";
import { useRouter } from "next/navigation";
import { AppConsts } from "@/utils";
import { FiPlus, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

export default function RoomList() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchRooms = async (page: number = 1, searchTerm: string = "") => {
    try {
      setLoading(true);
      const response = await getAllRoomsForHost({
        page,
        size: 10,
        search: searchTerm,
      });

      if (response.status === 200) {
        setRooms(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms", { id: "toast" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(1, search);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    fetchRooms(page, search);
  };

  const handleAddRoom = () => {
    router.push(AppConsts.DASHBOARD_ROOMS_ADD_URL);
  };

  const handleEditRoom = (slug: string) => {
    router.push(`/dashboard/rooms/edit?slug=${slug}`);
  };

  const handleViewRoom = (slug: string) => {
    router.push(AppConsts.DASHBOARD_ROOMS_VIEW_URL(slug));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-normal">My Rooms</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your room listings
          </p>
        </div>
        <button
          onClick={handleAddRoom}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add New Room
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search rooms by name, address, or district..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Room List */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-normal mb-2">
            No rooms yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Get started by adding your first room
          </p>
          <button
            onClick={handleAddRoom}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Your First Room
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onEdit={handleEditRoom}
                onView={handleViewRoom}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
