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
import { District } from "@/types/user/district";

interface HomeProps {
  districts: District[];
}

export default function Home({ districts }: HomeProps) {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ExploreNearby districts={districts} />
      <FeaturedRooms />
      <BookingProcess />
      <RecentlyViewed />
    </>
  );
}
