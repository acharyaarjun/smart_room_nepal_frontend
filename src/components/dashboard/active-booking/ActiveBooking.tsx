"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function ActiveBooking() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-[32px] font-semibold text-start mb-2">
          Welcome back, {user?.fullName.split(" ")[0]}! Your next adventure
          awaits🌄
        </h1>
      </div>
    </div>
  );
}
