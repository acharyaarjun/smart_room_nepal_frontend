import { Membership } from "@/components/dashboard/membership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership - Smart Room Nepal",
  description: "Manage your membership and view payment history",
};

export default function HostMembershipPage() {
  return <Membership />;
}
