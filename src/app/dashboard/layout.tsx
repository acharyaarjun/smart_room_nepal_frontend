import { ClientLayout } from "@/components/layouts";
import { AuthProvider } from "@/providers";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <section className="">
        <ClientLayout>{children}</ClientLayout>
      </section>
    </AuthProvider>
  );
}
