import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Settings",
  description: "Manage your account settings",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/user/settings`),
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
    description: "Manage your account settings",
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

export default function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Settings</h1>
        <p className="text-normal">
          Manage your account settings and preferences.
        </p>
        <div className="mt-8 text-center py-12">
          <p className="text-normal">Settings page coming soon</p>
        </div>
      </div>
    </div>
  );
}
