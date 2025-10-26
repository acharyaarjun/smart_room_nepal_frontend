"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Spinner } from "@/components/common";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === "host") {
        router.replace("/dashboard/host");
      } else if (user.role === "user" || user.role === "admin") {
        router.replace("/dashboard/user");
      } else {
        // Fallback for unknown roles
        router.replace("/");
      }
    }
  }, [user, router]);

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-dark">
      <Spinner />
    </div>
  );
}
