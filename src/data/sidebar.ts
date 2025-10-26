import { AppConsts } from "@/utils";
import { SidebarMenu } from "@/types/navbar/menu";
import {
  MdOutlineDashboardCustomize,
  MdOutlineMeetingRoom,
} from "react-icons/md";
import { PiCardholderBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiVipCrownLine } from "react-icons/ri";

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
    id: 4,
    title: "Membership",
    link: AppConsts.DASHBOARD_MEMBERSHIP_URL,
    icon: RiVipCrownLine,
    roles: ["host"], // Only visible to hosts
    badge: true, // Show badge when credits are low
  },
  {
    id: 5,
    title: "Settings",
    link: AppConsts.DASHBOARD_SETTINGS_URL,
    icon: IoSettingsOutline,
  },
];
