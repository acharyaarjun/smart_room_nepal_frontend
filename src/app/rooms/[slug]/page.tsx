import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { RoomDetails } from "@/components/rooms/details";
import { Breadcrumb } from "@/components/common";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Details",
  description: AppConsts.APP_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/rooms/slug`),
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
    description: AppConsts.APP_DESCRIPTION,
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

export default function page() {
  return (
    <>
      <Breadcrumb
        title="Room Details"
        description="Discover the best rooms available across Nepal, carefully selected for comfort and convenience."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />
      <RoomDetails />
    </>
  );
}
