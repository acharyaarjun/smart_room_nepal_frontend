import React from "react";
import { Breadcrumb } from "@/components/common";
import { RoomListing } from "@/components/rooms";

export default function Rooms() {
  return (
    <>
      <Breadcrumb
        title="Rooms"
        description="Discover the best rooms available across Nepal, carefully selected for comfort and convenience."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />
      <RoomListing />
    </>
  );
}
