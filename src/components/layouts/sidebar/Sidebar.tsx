"use client";
import Image from "next/image";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HostSidebarMenuData } from "@/data/hostSidebar";
import { UserSidebarMenuData } from "@/data/userSidebar";
import { SidebarMenu } from "@/types/navbar/menu";
import { TbLogout } from "react-icons/tb";
import { useLogin } from "@/hooks";
import { Spinner } from "@/components/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/features/common/sidebarSlice";

interface SidebarProps {
  dashboardType?: "host" | "user";
}

export default function Sidebar({ dashboardType }: SidebarProps) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { user, availableCredits } = useSelector(
    (state: RootState) => state.auth
  );

  const pathname = usePathname();
  const { handleLogout, isLoading } = useLogin();

  // Select the appropriate sidebar menu based on dashboardType
  let menuData: SidebarMenu[] = [];
  if (dashboardType === "host") {
    menuData = HostSidebarMenuData;
  } else if (dashboardType === "user") {
    menuData = UserSidebarMenuData;
  }

  // Filter menu items based on user role (if not using dashboardType)
  const filteredMenuData = menuData.filter((menu) => {
    if (!menu.roles || menu.roles.length === 0) {
      return true; // No role restriction
    }
    return user?.role && menu.roles.includes(user.role);
  });

  // Helper function to check if menu item is active
  const isMenuActive = (menuLink: string) => {
    // Exact match
    if (pathname === menuLink) return true;

    // For "My Rooms" menu in host dashboard
    if (
      menuLink === "/dashboard/host/rooms" &&
      pathname.startsWith("/dashboard/host/rooms")
    ) {
      return true;
    }

    // For host bookings
    if (
      menuLink === "/dashboard/host/bookings" &&
      pathname.startsWith("/dashboard/host/bookings")
    ) {
      return true;
    }

    // For host settings
    if (
      menuLink === "/dashboard/host/settings" &&
      pathname.startsWith("/dashboard/host/settings")
    ) {
      return true;
    }

    // For host membership
    if (
      menuLink === "/dashboard/host/membership" &&
      pathname.startsWith("/dashboard/host/membership")
    ) {
      return true;
    }

    // For user bookings
    if (
      menuLink === "/dashboard/user/bookings" &&
      pathname.startsWith("/dashboard/user/bookings")
    ) {
      return true;
    }

    // For user settings
    if (
      menuLink === "/dashboard/user/settings" &&
      pathname.startsWith("/dashboard/user/settings")
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="fixed lg:hidden bottom-0 left-0 w-full h-[60px] bg-light dark:bg-dropdown shadow-md border-t border-gray-300 dark:border-gray-700 z-50 pb-safe">
        <div className="flex justify-around items-center px-2 py-3 w-full h-full">
          {filteredMenuData.map((menu: SidebarMenu) => {
            const isActive = isMenuActive(menu.link);
            return (
              <Link
                key={menu.id}
                href={menu.link}
                className={`flex flex-col items-center justify-center text-xs transition-all relative ${
                  isActive ? "text-primary" : "text-gray-500 hover:text-primary"
                }`}
              >
                <menu.icon className="text-xl mb-1" />
              </Link>
            );
          })}

          <button
            title="Logout"
            onClick={!isLoading ? handleLogout : undefined}
            className="flex flex-col items-center justify-center text-xs text-gray-500 hover:text-primary transition-all"
          >
            <TbLogout className="text-xl mb-1" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sticky top-[120px] lg:block min-h-[calc(100dvh-200px)] max-h-[800px]">
        {/* Toggle Button */}
        <div className="absolute top-6 right-[-14px] w-7 h-7 flex justify-center items-center z-10">
          <div
            className="w-full h-full bg-light dark:bg-dark rounded-full shadow-sidebar cursor-pointer flex justify-center items-center border border-gray-300 dark:border-gray-700"
            onClick={() => dispatch(toggleSidebar())}
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronLeft className="text-normal text-sm" />
            </motion.div>
          </div>
        </div>

        {/* Sidebar Container */}
        <motion.div
          animate={{ width: isOpen ? 280 : 86 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col justify-between bg-light dark:bg-dropdown shadow-custom px-5 py-4 rounded-lg overflow-hidden"
        >
          <div>
            {/* User Info */}
            <div className="w-full flex items-center mb-8">
              {user?.userProfile?.avatar?.url ? (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <Image
                    src={user.userProfile.avatar.url}
                    alt={user?.fullName || "User Avatar"}
                    width={120}
                    height={120}
                    quality={100}
                    className="rounded-full h-[40px] w-[40px] object-cover shadow-card"
                    priority
                  />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] bg-primary text-white font-bold flex items-center justify-center rounded-full">
                  {user?.fullName?.charAt(0)}
                </div>
              )}

              <AnimatePresence>
                <motion.div
                  key="userInfo"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pl-[6px] max-w-[calc(100%-45px)]"
                >
                  <h2 className="font-semibold text-lg leading-[18px] whitespace-nowrap text-primary">
                    {user?.fullName}
                  </h2>
                  <p className="text-sm text-normal whitespace-nowrap">
                    {user?.username}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Menu */}
            {filteredMenuData.map((menu: SidebarMenu) => {
              const isActive = isMenuActive(menu.link);
              const showBadge = menu.badge && availableCredits === 0;

              return (
                <Link
                  key={menu.id}
                  href={menu.link}
                  className={`w-full flex items-center px-2 py-1.5 my-1 rounded-lg cursor-pointer group transition-all relative ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-primary"
                      : "text-normal hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                  }`}
                >
                  <div className="w-[30px] h-[30px] flex items-center justify-center relative">
                    <menu.icon className="text-xl" />
                    {showBadge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <AnimatePresence>
                    <motion.div
                      key={menu.id}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden max-w-[calc(100%-30px)] flex items-center gap-2"
                    >
                      <span className="font-medium group-hover:pl-1 transition-all duration-300 text-nowrap">
                        {menu.title}
                      </span>
                      {showBadge && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                          0
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          <div>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />

            {/* Logout */}
            <div
              className={`w-full flex items-center px-2 py-2 rounded-lg cursor-pointer group transition-all ${
                isLoading
                  ? "pointer-events-none opacity-60"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
              }`}
              onClick={!isLoading ? handleLogout : undefined}
            >
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                {isLoading ? (
                  <Spinner className="text-primary animate-spin" />
                ) : (
                  <TbLogout className="text-xl" />
                )}
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="logout"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden max-w-[calc(100%-30px)]"
                  >
                    <span className="font-medium group-hover:pl-1 transition-all duration-300 text-nowrap">
                      {isLoading ? "Logging out..." : "Logout"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
