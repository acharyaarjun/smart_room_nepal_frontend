import { AppConsts } from "@/utils";
import { SidebarMenu } from "@/types/navbar/menu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiCardholderBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMeetingRoom } from "react-icons/md";

export const SidebarMenuData: SidebarMenu[] = [
  {
    id: 1,
    title: "Dashboard",
    link: AppConsts.DASHBOARD_URL,
    icon: MdOutlineDashboardCustomize,
  },
  {
    id: 2,
    title: "Bookings",
    link: AppConsts.DASHBOARD_BOOKINGS_URL,
    icon: PiCardholderBold,
  },
  {
    id: 3,
    title: "My Rooms",
    link: AppConsts.DASHBOARD_ROOMS_URL,
    icon: MdOutlineMeetingRoom,
    roles: ["host"], // Only visible to hosts
  },
  {
    id: 5,
    title: "Settings",
    link: AppConsts.DASHBOARD_SETTINGS_URL,
    icon: IoSettingsOutline,
  },
];
