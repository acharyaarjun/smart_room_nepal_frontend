import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import { Rooms } from "@/components/rooms";
import { getDistricts, getAmenities } from "@/services/userService";
import { District } from "@/types/user/district";
import { Amenity } from "@/types/user/amenity";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Rooms",
  description: AppConsts.APP_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/rooms`),
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

export default async function page() {
  const [districtsData, amenitiesData] = await Promise.all([
    getDistricts(),
    getAmenities(),
  ]);

  const districts: District[] = districtsData?.data.data || [];
  const amenities: Amenity[] = amenitiesData?.data.data || [];

  return <Rooms districts={districts} amenities={amenities} />;
}
