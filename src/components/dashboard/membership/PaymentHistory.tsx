"use client";
import React, { useEffect, useState } from "react";
import { MembershipPayment } from "@/types/common/membership-type";
import * as membershipTypeService from "@/services/membershipTypeService";
import toast from "react-hot-toast";
import { MdHistory } from "react-icons/md";
import { Spinner } from "@/components/common";

export default function PaymentHistory() {
  const [payments, setPayments] = useState<MembershipPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      const response = await membershipTypeService.getMembershipPayment({});
      setPayments(response.data.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load payment history"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    const colorClass =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <MdHistory className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No payment history found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Your membership purchases will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Membership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-normal">
                        {payment.membershipType.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {payment.membershipType.limit} listings
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-normal">
                        NPR {payment.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(payment.expiryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {payment.transactionId || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {payment.paymentMethod}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {payments.map((payment) => (
              <div key={payment.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-normal">
                      {payment.membershipType.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {payment.membershipType.limit} listings
                    </div>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Amount
                    </div>
                    <div className="font-semibold text-normal">
                      NPR {payment.amount}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Date
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {formatDate(payment.paymentDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Expiry Date
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {formatDate(payment.expiryDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Method
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {payment.paymentMethod}
                    </div>
                  </div>
                </div>

                {payment.transactionId && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Transaction ID
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 font-mono mt-0.5">
                      {payment.transactionId}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
