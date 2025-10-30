"use client";

import React, { useEffect, useState } from "react";
import {
  ExploreNearby,
  FeaturedRooms,
  Hero,
  BookingProcess,
  WhyChooseUs,
  RecentlyViewed,
  RoomsNearMe,
} from "@/components/home";
import { Testimonials } from "@/components/home";
import { District } from "@/types/user/district";
import { getDistricts } from "@/services/userService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const [districts, setDistricts] = useState<District[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getDistricts().then((data) => {
      setDistricts(data?.data?.data || []);
    });
  }, []);

  return (
    <>
      <Hero districts={districts} />
      <RoomsNearMe />
      <WhyChooseUs />
      <ExploreNearby districts={districts} />
      <FeaturedRooms />
      <BookingProcess />
      <Testimonials />
      {user && <RecentlyViewed />}
    </>
  );
  // ...existing code...
}
