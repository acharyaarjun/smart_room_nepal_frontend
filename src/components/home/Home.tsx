"use client";
import React from "react";
import {
  ExploreNearby,
  FeaturedRooms,
  Hero,
  BookingProcess,
  WhyChooseUs,
  RecentlyViewed,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ExploreNearby />
      <FeaturedRooms />
      <BookingProcess />
      <RecentlyViewed />
    </>
  );
}
