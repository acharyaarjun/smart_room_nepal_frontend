"use client";
import { useState, useEffect } from "react";
import { Room } from "@/types/user/room";
import { SingleRoomItem } from "@/components/rooms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getRecentlyViewedRooms } from "@/services/userService";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RecentlyViewed() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchRecentRooms = async () => {
      setLoading(true);
      try {
        const response = await getRecentlyViewedRooms();

        if (response.status === 200 && response.data) {
          setRooms(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching recent rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecentRooms();
    }
  }, [user]);

  if (!user) {
    return null; // Don't show section if not logged in
  }

  if (loading) {
    return (
      <section id="recently-viewed" className="w-full py-12">
        <div className="container">
          <div className="w-full text-center">
            <h1 className="font-bold text-5xl capitalize mb-8">
              Recently Viewed
            </h1>
          </div>
          <div className="text-center py-12">Loading rooms...</div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return null; // Don't show section if no rooms
  }

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
          loop={rooms.length > 3}
          className=""
        >
          {rooms.map((room: Room) => (
            <SwiperSlide key={room.id} className="pb-4 px-4">
              <SingleRoomItem room={room} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
