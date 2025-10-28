import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { UserReviews } from "@/components/dashboard/user/reviews";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | My Reviews",
  description: "View and manage your reviews",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/user/reviews`),
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
    description: "View and manage your reviews",
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

export default function UserReviewsPage() {
  return <UserReviews />;
}
