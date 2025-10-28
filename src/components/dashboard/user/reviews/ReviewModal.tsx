"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaStar } from "react-icons/fa";
import { ReviewForm } from "@/types/user/review";
import { Spinner } from "@/components/common";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewForm) => Promise<void>;
  initialData?: ReviewForm;
  roomName: string;
  isEdit?: boolean;
  loading?: boolean;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  roomName,
  isEdit = false,
  loading = false,
}: ReviewModalProps) {
  const [formData, setFormData] = useState<ReviewForm>({
    rating: initialData?.rating || 0,
    message: initialData?.message || "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<{ rating?: string; message?: string }>(
    {}
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        rating: initialData.rating,
        message: initialData.message,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { rating?: string; message?: string } = {};

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Please select a rating between 1 and 5";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write your review";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Review must be at least 10 characters long";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Review must not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
    setErrors({ ...errors, rating: undefined });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-white dark:bg-dropdown rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="bg-white dark:bg-dropdown border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Review" : "Write a Review"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <FaTimes className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Room Name */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {roomName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your experience with this room
              </p>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <FaStar
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || formData.rating)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.rating}
                </p>
              )}
            </div>

            {/* Review Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setErrors({ ...errors, message: undefined });
                }}
                placeholder="Tell us about your experience with this room..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                disabled={loading}
              />
              <div className="flex justify-between mt-1">
                <div>
                  {errors.message && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.message.length}/500
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner />
                    {isEdit ? "Updating..." : "Submitting..."}
                  </>
                ) : isEdit ? (
                  "Update Review"
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
