import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Bookings",
  description: "Manage your bookings",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/host/bookings`),
    images: [
      {
        url: `${AppUrl.APP_BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    site: AppConsts.APP_CREATOR,
    title: AppConsts.APP_NAME,
    description: "Manage your bookings",
    creator: AppConsts.APP_CREATOR,
    images: [
      {
        url: `${AppUrl.APP_BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
};

export default function HostBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Bookings</h1>
        <p className="text-normal">View and manage bookings for your rooms.</p>
        <div className="mt-8 text-center py-12">
          <p className="text-normal">No bookings yet</p>
        </div>
      </div>
    </div>
  );
}
