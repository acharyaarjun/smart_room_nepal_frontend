import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/common";
import { RoomListing } from "@/components/rooms";
import { District } from "@/types/user/district";
import { Amenity } from "@/types/user/amenity";

interface RoomsProps {
  districts: District[];
  amenities: Amenity[];
}

export default function Rooms({ districts, amenities }: RoomsProps) {
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
