import { AppConsts } from "@/utils";
import { Metadata } from "next";
import React from "react";
import AppUrl from "@/utils/appConsts";
import ProfileSettings from "@/components/settings/ProfileSettings";
import ChangePassword from "@/components/settings/ChangePassword";

export const metadata: Metadata = {
  title: AppConsts.APP_NAME + " | Settings",
  description: "Manage your account settings",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}/dashboard/host/settings`),
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

export default function HostSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-normal text-sm">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <ProfileSettings />

      {/* Change Password */}
      <ChangePassword />
    </div>
  );
}
