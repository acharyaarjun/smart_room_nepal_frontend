"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/components/layouts/sidebar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: Props) {
  const { isOpen } = useSelector((state: any) => state.sidebar);
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const isClient = typeof window !== "undefined";

  const expandedWidth = 280;
  const collapsedWidth = 80;

  const currentWidth = `calc(100% - ${
    isOpen ? expandedWidth : collapsedWidth
  }px)`;
  const initialWidth = `calc(100% - ${expandedWidth}px)`;

  useEffect(() => {
    if (isClient && !user) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, router]);

  if (!isClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner color="text-tertiary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex w-full gap-8 relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content for XL and up */}
        <motion.div
          initial={{ width: initialWidth }}
          animate={{ width: currentWidth }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden hidden xl:block px-3"
        >
          {children}
        </motion.div>

        {/* Main Content for small screens */}
        <div className="overflow-hidden block xl:hidden w-full px-3">
          {children}
        </div>
      </div>
    </div>
  );
}
