"use client";
import React, { useState } from "react";
import { FaTimes, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import { RoomUnit } from "@/enums";
import { createRoomRequest } from "@/services/requestService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RoomRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomSlug: string;
  roomUnit: string;
  roomName: string;
  roomPrice: number;
  offerPrice?: number | null;
}

export default function RoomRequestModal({
  isOpen,
  onClose,
  roomSlug,
  roomUnit,
  roomName,
  roomPrice,
  offerPrice,
}: RoomRequestModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    isFixedDate: false,
    startDate: "",
    endDate: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
    message: "",
  });

  const isDayUnit = roomUnit === RoomUnit.DAY;
  const finalPrice = offerPrice || roomPrice;

  const validateForm = () => {
    const newErrors = {
      startDate: "",
      endDate: "",
      message: "",
    };

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (isDayUnit && formData.isFixedDate) {
      if (!formData.startDate) {
        newErrors.startDate = "Start date is required";
      }
      if (!formData.endDate) {
        newErrors.endDate = "End date is required";
      }
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
          newErrors.startDate = "Start date cannot be in the past";
        }
        if (end < start) {
          newErrors.endDate = "End date must be after start date";
        }
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const calculateDays = () => {
    if (
      !isDayUnit ||
      !formData.isFixedDate ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return 0;
    }
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const estimatedCost = calculateDays() * finalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData: any = {
        message: formData.message.trim(),
      };

      if (isDayUnit) {
        requestData.isFixedDate = formData.isFixedDate;
        if (formData.isFixedDate) {
          requestData.startDate = formData.startDate;
          requestData.endDate = formData.endDate;
        }
      }

      await createRoomRequest(requestData, roomSlug);

      toast.success("Room request submitted successfully!");
      router.push("/dashboard/user/bookings");
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to submit room request";
      toast.error(errorMessage);
      console.error("Error submitting room request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData({
        isFixedDate: false,
        startDate: "",
        endDate: "",
        message: "",
      });
      setErrors({ startDate: "", endDate: "", message: "" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-white dark:bg-dropdown rounded-2xl shadow-2xl w-full max-w-2xl my-8">
          {/* Header */}
          <div className="bg-white dark:bg-dropdown border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Request Room
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {roomName}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaTimes className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Price Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Price per {roomUnit}
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                  {offerPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                      Rs. {roomPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Date Selection for Day Unit */}
            {isDayUnit && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFixedDate"
                    checked={formData.isFixedDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isFixedDate: e.target.checked,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="isFixedDate"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    I want to specify exact dates
                  </label>
                </div>

                {formData.isFixedDate && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        disabled={isSubmitting}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                          errors.startDate
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        disabled={isSubmitting}
                        min={
                          formData.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                          errors.endDate
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.endDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Estimated Cost */}
                {formData.isFixedDate &&
                  formData.startDate &&
                  formData.endDate &&
                  calculateDays() > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            Duration: {calculateDays()}{" "}
                            {calculateDays() === 1 ? "day" : "days"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-green-600 dark:text-green-400">
                            Estimated Cost
                          </span>
                          <div className="text-xl font-bold text-green-900 dark:text-green-100">
                            Rs. {estimatedCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                disabled={isSubmitting}
                rows={5}
                placeholder="Tell the host about yourself and why you're interested in this room..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 10 characters
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Important Information
              </h4>
              <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
                <li>• Your request will be sent to the room owner</li>
                <li>• The owner will review and respond to your request</li>
                <li>• You can cancel your request while it&apos;s pending</li>
                <li>• Final price may be negotiated with the owner</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
