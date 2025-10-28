import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { UserRequests } from "@/components/dashboard/user/requests";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | My Bookings",
  description: "View your bookings",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/user/bookings`),
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
    description: "View your bookings",
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

export default function UserBookingsPage() {
  return <UserRequests />;
}
