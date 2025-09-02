"use client";
import { RoomData } from "@/data/room";
import { Room } from "@/types/room/room";
import React from "react";
import { SingleRoomItem } from "@/components/rooms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function RecentlyViewed() {
  return (
    <section id="recently-viewed" className="w-full py-12">
      <div className="container">
        <div className="w-full text-center">
          <h1 className="font-bold text-5xl capitalize mb-8">
            Recently Viewed
          </h1>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
          className=""
        >
          {RoomData.map((room: Room) => (
            <SwiperSlide key={room.id} className="pb-4 px-4">
              <SingleRoomItem room={room} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
