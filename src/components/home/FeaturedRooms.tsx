"use client";
import React, { useState, useEffect } from "react";
import { SingleRoomItem } from "@/components/rooms";
import { Room } from "@/types/user/room";
import { getAllRooms } from "@/services/userService";

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      setLoading(true);
      try {
        const response = await getAllRooms({
          isFeatured: true,
          page: 1,
          size: 6,
        });

        if (response.status === 200 && response.data) {
          setRooms(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching featured rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  if (loading) {
    return (
      <section id="featured-rooms" className="w-full py-12">
        <div className="container">
          <div className="w-full text-center">
            <h1 className="font-bold text-5xl capitalize mb-8">
              Featured Rooms
            </h1>
          </div>
          <div className="text-center py-12">Loading featured rooms...</div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return null; // Don't show section if no featured rooms
  }

  return (
    <section id="featured-rooms" className="w-full py-12">
      <div className="container">
        <div className="w-full text-center">
          <h1 className="font-bold text-5xl capitalize mb-8">Featured Rooms</h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {rooms.map((room: Room) => (
            <SingleRoomItem key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
