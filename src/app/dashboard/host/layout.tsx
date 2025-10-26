import { ClientLayout } from "@/components/layouts";
import { AuthProvider } from "@/providers";
import React from "react";

export default function HostDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider roles={["host"]}>
      <section className="">
        <ClientLayout dashboardType="host">{children}</ClientLayout>
      </section>
    </AuthProvider>
  );
}
