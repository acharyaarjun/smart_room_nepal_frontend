import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { HostRequests } from "@/components/dashboard/host/requests";

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
  return <HostRequests />;
}
