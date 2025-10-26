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
  DASHBOARD_URL: "/dashboard",
  DASHBOARD_BOOKINGS_URL: "/dashboard/bookings",
  DASHBOARD_INVITATIONS_URL: "/dashboard/invitations",
  DASHBOARD_NOTIFICATIONS_URL: "/dashboard/notifications",
  DASHBOARD_SETTINGS_URL: "/dashboard/settings",
  DASHBOARD_ROOMS_URL: "/dashboard/rooms",
  DASHBOARD_ROOMS_ADD_URL: "/dashboard/rooms/add",
  DASHBOARD_ROOMS_EDIT_URL: (slug: string) => `/dashboard/rooms/edit/${slug}`,

  // social media links
  TWITTER_URL: "https://twitter.com/smartroomnepal",
  INSTAGRAM_URL: "https://instagram.com/smartroomnepal",
  FACEBOOK_URL: "https://facebook.com/smartroomnepal",
  LINKEDIN_URL: "https://linkedin.com/company/smartroomnepal",
};

export default AppConsts;
