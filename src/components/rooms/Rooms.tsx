import React from "react";
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
      <RoomListing districts={districts} amenities={amenities} />
    </>
  );
}
