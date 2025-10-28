import { SidebarMenu } from "@/types/navbar/menu";
import {
  MdOutlineDashboardCustomize,
  MdOutlineMeetingRoom,
  MdRateReview,
} from "react-icons/md";
import { PiCardholderBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiVipCrownLine } from "react-icons/ri";

export const HostSidebarMenuData: SidebarMenu[] = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard/host",
    icon: MdOutlineDashboardCustomize,
  },
  {
    id: 2,
    title: "My Rooms",
    link: "/dashboard/host/rooms",
    icon: MdOutlineMeetingRoom,
  },
  {
    id: 3,
    title: "Bookings",
    link: "/dashboard/host/bookings",
    icon: PiCardholderBold,
  },
  {
    id: 4,
    title: "Reviews",
    link: "/dashboard/host/reviews",
    icon: MdRateReview,
  },
  {
    id: 5,
    title: "Membership",
    link: "/dashboard/host/membership",
    icon: RiVipCrownLine,
    badge: true, // Show badge when credits are low
  },
  {
    id: 6,
    title: "Settings",
    link: "/dashboard/host/settings",
    icon: IoSettingsOutline,
  },
];
