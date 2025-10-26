import { ClientLayout } from "@/components/layouts";
import { AuthProvider } from "@/providers";
import React from "react";

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider roles={["user"]}>
      <section className="">
        <ClientLayout dashboardType="user">{children}</ClientLayout>
      </section>
    </AuthProvider>
  );
}
