/**
 * This file contains the base URLs for the application and its social media links.
 * It is used to centralize the URLs for easy access and maintenance.
 * @example
 * import AppConsts from "@/utils";
 * console.log(AppConsts.APP_BASE_URL); // Outputs: https://smartroomnepal.com
 * console.log(AppConsts.TWITTER_URL); // Outputs: https://twitter.com/smartroomnepal
 */

const AppConsts = {
  APP_BASE_URL: "https://smartroomnepal.com",
  APP_NAME: "Smart Room Nepal",
  APP_DESCRIPTION: "Smart Room Nepal - Your Smart Home Solution",
  APP_CREATOR: "@smartroomnepal",

  // Application URLs

  // Host Dashboard URLs
  DASHBOARD_HOST_URL: "/dashboard/host",
  DASHBOARD_HOST_ROOMS_URL: "/dashboard/host/rooms",
  DASHBOARD_HOST_ROOMS_ADD_URL: "/dashboard/host/rooms/add",
  DASHBOARD_HOST_ROOMS_EDIT_URL: (slug: string) =>
    `/dashboard/host/rooms/edit/${slug}`,
  DASHBOARD_HOST_ROOMS_VIEW_URL: (slug: string) =>
    `/dashboard/host/rooms/view/${slug}`,
  DASHBOARD_HOST_BOOKINGS_URL: "/dashboard/host/bookings",
  DASHBOARD_HOST_MEMBERSHIP_URL: "/dashboard/host/membership",
  DASHBOARD_HOST_SETTINGS_URL: "/dashboard/host/settings",

  // User Dashboard URLs
  DASHBOARD_USER_URL: "/dashboard/user",
  DASHBOARD_USER_BOOKINGS_URL: "/dashboard/user/bookings",
  DASHBOARD_USER_SETTINGS_URL: "/dashboard/user/settings",

  // social media links
  TWITTER_URL: "https://twitter.com/smartroomnepal",
  INSTAGRAM_URL: "https://instagram.com/smartroomnepal",
  FACEBOOK_URL: "https://facebook.com/smartroomnepal",
  LINKEDIN_URL: "https://linkedin.com/company/smartroomnepal",
};

export default AppConsts;
