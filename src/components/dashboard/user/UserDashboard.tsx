/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ActiveBooking } from "@/components/dashboard/active-booking";
import { NoActiveBooking } from "@/components/dashboard/no-active-booking";
import { useState } from "react";
import { DefaultSkeleton } from "@/components/common";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const { isActiveBooking } = useSelector((state: RootState) => state.app);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* User Dashboard Header */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-normal">
              Manage your bookings and explore available rooms.
            </p>
          </div>

          {/* Booking Status */}
          {isActiveBooking ? <ActiveBooking /> : <NoActiveBooking />}
        </>
      )}
    </div>
  );
}
