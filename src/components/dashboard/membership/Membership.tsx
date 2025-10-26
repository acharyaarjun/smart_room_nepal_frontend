"use client";
import React, { useState, useEffect } from "react";
import { RiVipCrownLine } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import MembershipTypes from "./MembershipTypes";
import PaymentHistory from "./PaymentHistory";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Tab = "plans" | "history";

export default function Membership() {
  const { availableCredits } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<Tab>("plans");

  // Auto-focus on plans tab when credits are 0
  useEffect(() => {
    if (availableCredits === 0) {
      setActiveTab("plans");
    }
  }, [availableCredits]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-normal">Membership</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your membership plans and view payment history
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "plans"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-normal"
            }`}
          >
            <RiVipCrownLine className="w-5 h-5" />
            Membership Plans
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-normal"
            }`}
          >
            <MdHistory className="w-5 h-5" />
            Payment History
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "plans" && <MembershipTypes />}
      {activeTab === "history" && <PaymentHistory />}
    </div>
  );
}
