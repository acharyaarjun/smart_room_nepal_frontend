"use client";
import React from "react";
import {
  ExploreNearby,
  FeaturedRooms,
  Hero,
  BookingProcess,
  WhyChooseUs,
  RecentlyViewed,
  Testimonials,
  RoomsNearMe,
} from "@/components/home";
import { District } from "@/types/user/district";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HomeProps {
  districts: District[];
}

export default function Home({ districts }: HomeProps) {
  const { user } = useSelector((state: RootState) => state.auth);
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
}
