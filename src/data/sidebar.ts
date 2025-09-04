import { AppConsts } from "@/utils";
import { SidebarMenu } from "@/types/navbar/menu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiCardholderBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

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
    id: 5,
    title: "Settings",
    link: AppConsts.DASHBOARD_SETTINGS_URL,
    icon: IoSettingsOutline,
  },
];
