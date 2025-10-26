import React from "react";
import { RoomDetail } from "@/components/dashboard/rooms/details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Details - Smart Room Nepal",
  description: "View and manage room details, amenities, and media",
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HostRoomDetailPage({ params }: Props) {
  const { slug } = await params;

  return <RoomDetail slug={slug} />;
}
