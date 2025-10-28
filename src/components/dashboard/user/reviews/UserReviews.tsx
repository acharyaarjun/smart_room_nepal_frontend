"use client";
import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaEdit,
  FaTrash,
  FaFilter,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  getAllRoomReviewsForUser,
  updateRoomReview,
  deleteRoomReview,
} from "@/services/reviewService";
import { Review, ReviewForm } from "@/types/user/review";
import { toast } from "react-hot-toast";
import { Pagination, Spinner, ConfirmDialog } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import ReviewModal from "./ReviewModal";

export default function UserReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(
    undefined
  );
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomReviewsForUser({
        page: currentPage,
        size: 10,
        rating: ratingFilter,
        sort: "createdAt",
        order: "desc",
      });

      setReviews(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch reviews";
      toast.error(errorMessage);
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, ratingFilter]);

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleUpdateReview = async (data: ReviewForm) => {
    if (!selectedReview) return;

    setIsUpdating(true);
    try {
      const response = await updateRoomReview(data, selectedReview.id);

      if (response.status === 200) {
        toast.success("Review updated successfully");
        setIsEditModalOpen(false);
        setSelectedReview(null);
        fetchReviews();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update review";
      toast.error(errorMessage);
      console.error("Error updating review:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviewToDelete(reviewId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;

    setIsDeleting(true);
    try {
      const response = await deleteRoomReview(reviewToDelete);

      if (response.status === 200) {
        toast.success("Review deleted successfully");
        setIsDeleteDialogOpen(false);
        setReviewToDelete(null);
        fetchReviews();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
      console.error("Error deleting review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-primary">My Reviews</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Rating Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={ratingFilter ?? ""}
                onChange={(e) => {
                  setRatingFilter(
                    e.target.value ? Number(e.target.value) : undefined
                  );
                  setCurrentPage(1);
                }}
                className="pl-10 lg:max-w-40 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none w-full sm:w-48"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-normal text-lg">No reviews found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              You haven&apos;t written any reviews yet
            </p>
          </div>
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  {/* Room Info with Host Avatar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {review.roomRequest.room.user.userProfile.avatar ? (
                        <Image
                          src={getProxiedImageUrl(
                            review.roomRequest.room.user.userProfile.avatar.url
                          )}
                          alt={review.roomRequest.room.user.fullName}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                          {review.roomRequest.room.user.fullName.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate text-wrap break-words line-clamp-1">
                          {review.roomRequest.room.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Host: {review.roomRequest.room.user.fullName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Rs.{" "}
                          {(
                            review.roomRequest.room.offerPrice ||
                            review.roomRequest.room.price
                          ).toLocaleString()}{" "}
                          / {review.roomRequest.room.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Review Message */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {review.message}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Review Modal */}
      {isEditModalOpen && selectedReview && (
        <ReviewModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedReview(null);
          }}
          onSubmit={handleUpdateReview}
          initialData={{
            rating: selectedReview.rating,
            message: selectedReview.message,
          }}
          roomName={selectedReview.roomRequest.room.name}
          isEdit={true}
          loading={isUpdating}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteReview}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Keep It"
        loading={isDeleting}
      />
    </div>
  );
}
