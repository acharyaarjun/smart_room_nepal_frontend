"use client";
import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaTimes,
  FaFilter,
  FaCalendarAlt,
  FaHome,
  FaStar,
} from "react-icons/fa";
import {
  getAllRoomRequestForUser,
  cancelRoomRequest,
} from "@/services/requestService";
import { createRoomReview } from "@/services/reviewService";
import { RoomRequest } from "@/types/user/request";
import { ReviewForm } from "@/types/user/review";
import { RoomRequestStatus } from "@/enums";
import { toast } from "react-hot-toast";
import { Pagination, Spinner, ConfirmDialog } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import { ReviewModal } from "@/components/dashboard/user/reviews";

export default function UserRequests() {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [requestForReview, setRequestForReview] = useState<RoomRequest | null>(
    null
  );
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomRequestForUser({
        page: currentPage,
        size: 10,
        roomRequestStatus: statusFilter,
        sort: "createdAt",
        order: "desc",
      });

      setRequests(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch requests";
      toast.error(errorMessage);
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter]);

  const handleViewDetails = (request: RoomRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleCancelRequest = (token: string) => {
    setRequestToCancel(token);
    setIsCancelDialogOpen(true);
  };

  const confirmCancelRequest = async () => {
    if (!requestToCancel) return;

    setIsCancelling(true);
    try {
      const response = await cancelRoomRequest(requestToCancel);

      if (response.status === 200) {
        toast.success("Request cancelled successfully");
        setIsCancelDialogOpen(false);
        setRequestToCancel(null);
        fetchRequests();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to cancel request";
      toast.error(errorMessage);
      console.error("Error cancelling request:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleAddReview = (request: RoomRequest) => {
    setRequestForReview(request);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (data: ReviewForm) => {
    if (!requestForReview) return;

    setIsSubmittingReview(true);
    try {
      const response = await createRoomReview(data, requestForReview.id);

      if (response.status === 201) {
        toast.success("Review submitted successfully");
        setIsReviewModalOpen(false);
        setRequestForReview(null);
        fetchRequests();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      [RoomRequestStatus.PENDING]:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      [RoomRequestStatus.APPROVED]:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      [RoomRequestStatus.REJECTED]:
        "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      [RoomRequestStatus.CANCELED]:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
      [RoomRequestStatus.ON_GOING]:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      [RoomRequestStatus.COMPLETED]:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.toUpperCase()}
      </span>
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
          <h1 className="text-2xl font-bold text-primary">My Room Requests</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            {/* <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 lg:max-w-40 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white w-full sm:w-64"
              />
            </div> */}

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 lg:max-w-40 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none w-full sm:w-48"
              >
                <option value="">All Status</option>
                <option value={RoomRequestStatus.PENDING}>Pending</option>
                <option value={RoomRequestStatus.APPROVED}>Approved</option>
                <option value={RoomRequestStatus.REJECTED}>Rejected</option>
                <option value={RoomRequestStatus.CANCELED}>Canceled</option>
                <option value={RoomRequestStatus.ON_GOING}>Ongoing</option>
                <option value={RoomRequestStatus.COMPLETED}>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-normal text-lg">No requests found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Start by requesting a room from the rooms page
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Host
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {request.room.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {request.room.address}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.room.user.fullName}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          Rs.{" "}
                          {(
                            request.acceptedPrice || request.price
                          ).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          / {request.room.unit}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(request)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {request.status === RoomRequestStatus.PENDING && (
                            <button
                              onClick={() => handleCancelRequest(request.token)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Cancel Request"
                            >
                              <FaTimes />
                            </button>
                          )}
                          {request.status === RoomRequestStatus.COMPLETED &&
                            !request.hasReview && (
                              <button
                                onClick={() => handleAddReview(request)}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                title="Add Review"
                              >
                                <FaStar />
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {request.room.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {request.room.address}
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Host:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {request.room.user.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Price:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Rs.{" "}
                        {(
                          request.acceptedPrice || request.price
                        ).toLocaleString()}{" "}
                        / {request.room.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Requested:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEye /> View
                    </button>
                    {request.status === RoomRequestStatus.PENDING && (
                      <button
                        onClick={() => handleCancelRequest(request.token)}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes /> Cancel
                      </button>
                    )}
                    {request.status === RoomRequestStatus.COMPLETED &&
                      !request.hasReview && (
                        <button
                          onClick={() => handleAddReview(request)}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <FaStar /> Review
                        </button>
                      )}
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

      {/* View Details Modal */}
      {isViewModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white dark:bg-dropdown rounded-2xl shadow-2xl w-full max-w-3xl my-8">
              {/* Header */}
              <div className="bg-white dark:bg-dropdown border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Request Details
                </h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  {getStatusBadge(selectedRequest.status)}
                </div>

                {/* Room Info */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <FaHome className="text-primary" />
                    Room Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Name:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.room.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Address:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.room.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Type:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.room.roomType.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Capacity:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.room.maxCapacity.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Host Info */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Host Information
                  </h3>
                  <div className="flex items-center gap-4">
                    {selectedRequest.room.user.userProfile.avatar ? (
                      <Image
                        src={getProxiedImageUrl(
                          selectedRequest.room.user.userProfile.avatar.url
                        )}
                        alt={selectedRequest.room.user.fullName}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                        {selectedRequest.room.user.fullName.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {selectedRequest.room.user.fullName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedRequest.room.user.email}
                      </div>
                      {selectedRequest.room.user.userProfile.phone && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedRequest.room.user.userProfile.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Price Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Room Price:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Rs. {selectedRequest.price.toLocaleString()} /{" "}
                        {selectedRequest.room.unit}
                      </span>
                    </div>
                    {selectedRequest.acceptedPrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Accepted Price:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          Rs. {selectedRequest.acceptedPrice.toLocaleString()} /{" "}
                          {selectedRequest.room.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Info */}
                {selectedRequest.isFixedDate &&
                  selectedRequest.startDate &&
                  selectedRequest.endDate && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        Date Range
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Start Date:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatDate(selectedRequest.startDate)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            End Date:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatDate(selectedRequest.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Timeline */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Timeline
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Requested:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(selectedRequest.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Last Updated:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(selectedRequest.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white dark:bg-dropdown border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3 rounded-b-2xl">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                {selectedRequest.status === RoomRequestStatus.PENDING && (
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleCancelRequest(selectedRequest.token);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={confirmCancelRequest}
        title="Cancel Request"
        message="Are you sure you want to cancel this room request? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        loading={isCancelling}
      />

      {/* Review Modal */}
      {isReviewModalOpen && requestForReview && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setRequestForReview(null);
          }}
          onSubmit={handleSubmitReview}
          roomName={requestForReview.room.name}
          isEdit={false}
          loading={isSubmittingReview}
        />
      )}
    </div>
  );
}
