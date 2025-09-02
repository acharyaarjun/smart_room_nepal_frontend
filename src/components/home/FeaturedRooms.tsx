import React from "react";
import { SingleRoomItem } from "@/components/rooms";
import { RoomData } from "@/data/room";
import { Room } from "@/types/room/room";

export default function FeaturedRooms() {
  return (
    <section id="featured-rooms" className="w-full py-12">
      <div className="container">
        <div className="w-full text-center">
          <h1 className="font-bold text-5xl capitalize mb-8">Featured Rooms</h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {RoomData.map((room: Room) => (
            <SingleRoomItem key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
