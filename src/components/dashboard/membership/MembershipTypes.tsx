"use client";
import React, { useEffect, useState } from "react";
import { MembershipType } from "@/types/common/membership-type";
import * as membershipTypeService from "@/services/membershipTypeService";
import toast from "react-hot-toast";
import { FiCheck, FiAlertCircle } from "react-icons/fi";
import { RiVipCrownLine } from "react-icons/ri";
import { Spinner } from "@/components/common";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function MembershipTypes() {
  const [membershipTypes, setMembershipTypes] = useState<MembershipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [selectedMembershipId, setSelectedMembershipId] = useState<
    number | null
  >(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { availableCredits } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchMembershipTypes();
  }, []);

  const fetchMembershipTypes = async () => {
    try {
      setLoading(true);
      const response = await membershipTypeService.getAllMembershipTypes({});
      setMembershipTypes(response.data.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load membership types"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseClick = (membershipId: number) => {
    setSelectedMembershipId(membershipId);
    setShowConfirmDialog(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedMembershipId) return;

    try {
      setPurchaseLoading(true);
      const response = await membershipTypeService.createMembership(
        selectedMembershipId
      );

      // Open Khalti payment URL in new window
      if (response.data.paymentUrl) {
        window.open(response.data.paymentUrl, "_blank");
        toast.success("Payment window opened. Please complete the payment.");
      }

      setShowConfirmDialog(false);
      setSelectedMembershipId(null);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create membership"
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Alert if no credits */}
        {availableCredits === 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                No Credits Available
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                You have 0 credits remaining. Please purchase a membership plan
                to continue listing rooms.
              </p>
            </div>
          </div>
        )}

        {/* Membership Plans Grid */}
        {membershipTypes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <RiVipCrownLine className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No membership plans available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipTypes.map((membership) => (
              <div
                key={membership.id}
                className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 p-6 flex flex-col"
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <RiVipCrownLine className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-normal mb-2">
                    {membership.name}
                  </h3>
                  {membership.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {membership.description}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">
                    NPR {membership.price}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {membership.limit} room listings
                  </div>
                </div>

                {/* Features */}
                {membership.features && (
                  <div className="space-y-3 mb-6 flex-grow">
                    {membership.features.split(",").map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchaseClick(membership.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Purchase Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setSelectedMembershipId(null);
        }}
        onConfirm={handleConfirmPurchase}
        message="Are you sure you want to purchase this membership plan? You will be redirected to Khalti payment gateway."
        confirmText="Proceed to Payment"
        confirmButtonColor="primary"
        loading={purchaseLoading}
      />
    </>
  );
}
