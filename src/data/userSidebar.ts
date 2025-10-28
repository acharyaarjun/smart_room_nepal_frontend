import { SidebarMenu } from "@/types/navbar/menu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiCardholderBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdExplore, MdRateReview } from "react-icons/md";

export const UserSidebarMenuData: SidebarMenu[] = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard/user",
    icon: MdOutlineDashboardCustomize,
  },
  {
    id: 2,
    title: "My Bookings",
    link: "/dashboard/user/bookings",
    icon: PiCardholderBold,
  },
  {
    id: 3,
    title: "My Reviews",
    link: "/dashboard/user/reviews",
    icon: MdRateReview,
  },
  {
    id: 4,
    title: "Explore Rooms",
    link: "/rooms",
    icon: MdExplore,
  },
  {
    id: 5,
    title: "Settings",
    link: "/dashboard/user/settings",
    icon: IoSettingsOutline,
  },
];
