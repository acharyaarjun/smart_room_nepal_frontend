"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Breadcrumb } from "@/components/common";
import { RoomListing } from "@/components/rooms";
import { District } from "@/types/user/district";
import { Amenity } from "@/types/user/amenity";
import { getDistricts, getAmenities } from "@/services/userService";
import { Spinner } from "@/components/common";

export default function Rooms() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtsData, amenitiesData] = await Promise.all([
          getDistricts(),
          getAmenities(),
        ]);

        setDistricts(districtsData?.data?.data || []);
        setAmenities(amenitiesData?.data?.data || []);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to load filters data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Breadcrumb
          title="Rooms"
          description="Discover the best rooms available across Nepal, carefully selected for comfort and convenience."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
        />
        <section id="room-listing" className="w-full py-12">
          <div className="container">
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumb
          title="Rooms"
          description="Discover the best rooms available across Nepal, carefully selected for comfort and convenience."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
        />
        <section id="room-listing" className="w-full py-12">
          <div className="container">
            <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Rooms"
        description="Discover the best rooms available across Nepal, carefully selected for comfort and convenience."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />
      <Suspense
        fallback={
          <section id="room-listing" className="w-full py-12">
            <div className="container">
              <div className="text-center py-12 bg-primary/10 rounded-lg italic text-gray-600 dark:text-gray-300">
                Loading rooms...
              </div>
            </div>
          </section>
        }
      >
        <RoomListing districts={districts} amenities={amenities} />
      </Suspense>
    </>
  );
}
