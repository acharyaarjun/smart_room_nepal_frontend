/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DefaultSkeleton } from "@/components/common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HostDashboard() {
  const [loading, setLoading] = useState(false);
  const { user, availableCredits } = useSelector(
    (state: RootState) => state.auth
  );

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
          {/* Host Dashboard Header */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-normal">
              Manage your rooms, bookings, and membership from your host
              dashboard.
            </p>
          </div>

          {/* Credits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <h3 className="text-lg font-semibold text-normal mb-2">
                Available Credits
              </h3>
              <p className="text-3xl font-bold text-primary">
                {availableCredits}
              </p>
              {availableCredits === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Your credits are running low. Purchase more to continue
                  listing rooms.
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <h3 className="text-lg font-semibold text-normal mb-2">
                Total Rooms
              </h3>
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-normal mt-2">Active room listings</p>
            </div>

            <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
              <h3 className="text-lg font-semibold text-normal mb-2">
                Total Bookings
              </h3>
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-normal mt-2">Bookings received</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-8 text-normal">
              <p>No recent activity to display</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
