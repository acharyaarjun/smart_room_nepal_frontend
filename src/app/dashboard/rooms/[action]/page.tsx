"use client";
import React from "react";
import RoomForm from "@/components/dashboard/rooms/RoomForm";
import { useParams, useSearchParams } from "next/navigation";

export default function RoomActionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const action = params?.action as string;
  const slug = searchParams.get("slug") || undefined;

  return <RoomForm action={action} slug={slug} />;
}
