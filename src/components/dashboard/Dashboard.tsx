/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ActiveBooking } from "@/components/dashboard/active-booking";
import { NoActiveBooking } from "@/components/dashboard/no-active-booking";
import { useState } from "react";
import { DefaultSkeleton } from "@/components/common";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { isActiveBooking } = useSelector((state: RootState) => state.app);

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : isActiveBooking ? (
        <ActiveBooking />
      ) : (
        <NoActiveBooking />
      )}
    </>
  );
}
