import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { HostReviews } from "@/components/dashboard/host/reviews";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Reviews",
  description: "View reviews from your guests",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/host/reviews`),
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
    description: "View reviews from your guests",
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

export default function HostReviewsPage() {
  return <HostReviews />;
}
