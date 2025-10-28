"use client";
import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";
import {
  getAllRoomRequestForHost,
  updateRoomRequest,
} from "@/services/requestService";
import { RoomRequest } from "@/types/host/request";
import { RoomRequestStatus } from "@/enums";
import { toast } from "react-hot-toast";
import { Pagination, Spinner, ConfirmDialog } from "@/components/common";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";

export default function HostRequests() {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // roomFilter can be used to filter by room slug from URL params in the future
  const [roomFilter, setRoomFilter] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [requestToProcess, setRequestToProcess] = useState<string | null>(null);
  const [acceptedPrice, setAcceptedPrice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomRequestForHost({
        page: currentPage,
        size: 10,
        search: searchTerm,
        roomRequestStatus: statusFilter,
        room: roomFilter,
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
  }, [currentPage, searchTerm, statusFilter, roomFilter]);

  const handleViewDetails = (request: RoomRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleApproveRequest = (token: string, price: number) => {
    setRequestToProcess(token);
    setAcceptedPrice(price.toString());
    setIsApproveModalOpen(true);
  };

  const handleRejectRequest = (token: string) => {
    setRequestToProcess(token);
    setIsRejectDialogOpen(true);
  };

  const confirmApproveRequest = async () => {
    if (!requestToProcess || !acceptedPrice) return;

    const priceValue = parseFloat(acceptedPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error("Please enter a valid accepted price");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await updateRoomRequest(
        {
          status: RoomRequestStatus.APPROVED,
          acceptedPrice: priceValue,
        },
        requestToProcess
      );

      if (response.status === 200) {
        toast.success("Request approved successfully");
        setIsApproveModalOpen(false);
        setRequestToProcess(null);
        setAcceptedPrice("");
        fetchRequests();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to approve request";
      toast.error(errorMessage);
      console.error("Error approving request:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmRejectRequest = async () => {
    if (!requestToProcess) return;

    setIsProcessing(true);
    try {
      const response = await updateRoomRequest(
        {
          status: RoomRequestStatus.REJECTED,
        },
        requestToProcess
      );

      if (response.status === 200) {
        toast.success("Request rejected");
        setIsRejectDialogOpen(false);
        setRequestToProcess(null);
        fetchRequests();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to reject request";
      toast.error(errorMessage);
      console.error("Error rejecting request:", error);
    } finally {
      setIsProcessing(false);
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
          <h1 className="text-2xl font-bold text-primary">Room Requests</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            {/* <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
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
                className="pl-10 lg:max-w-40  pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none w-full sm:w-48"
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
              Requests from users will appear here
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
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Room
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
                          {request.user.fullName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {request.user.email}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.room.name}
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
                            <>
                              <button
                                onClick={() =>
                                  handleApproveRequest(
                                    request.token,
                                    request.price
                                  )
                                }
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                title="Approve Request"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() =>
                                  handleRejectRequest(request.token)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Reject Request"
                              >
                                <FaTimes />
                              </button>
                            </>
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
                        {request.user.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {request.room.name}
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {request.user.email}
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
                      <>
                        <button
                          onClick={() =>
                            handleApproveRequest(request.token, request.price)
                          }
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.token)}
                          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
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

                {/* User Info */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    User Information
                  </h3>
                  <div className="flex items-center gap-4">
                    {selectedRequest.user.userProfile.avatar ? (
                      <Image
                        src={getProxiedImageUrl(
                          selectedRequest.user.userProfile.avatar.url
                        )}
                        alt={selectedRequest.user.fullName}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                        {selectedRequest.user.fullName.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {selectedRequest.user.fullName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedRequest.user.email}
                      </div>
                      {selectedRequest.user.userProfile.phone && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedRequest.user.userProfile.phone}
                        </div>
                      )}
                    </div>
                  </div>
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
                        Unit:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.room.unit}
                      </span>
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
                  <>
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleApproveRequest(
                          selectedRequest.token,
                          selectedRequest.price
                        );
                      }}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleRejectRequest(selectedRequest.token);
                      }}
                      className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white dark:bg-dropdown rounded-2xl shadow-2xl w-full max-w-md my-8">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Approve Request
                  </h2>
                  <button
                    onClick={() => {
                      setIsApproveModalOpen(false);
                      setAcceptedPrice("");
                    }}
                    disabled={isProcessing}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <FaTimes className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  Enter the final accepted price for this booking.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accepted Price (Rs.) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={acceptedPrice}
                    onChange={(e) => setAcceptedPrice(e.target.value)}
                    disabled={isProcessing}
                    min="0"
                    step="0.01"
                    placeholder="Enter accepted price"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsApproveModalOpen(false);
                      setAcceptedPrice("");
                    }}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApproveRequest}
                    disabled={isProcessing || !acceptedPrice}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <FaCheck /> Approve
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onConfirm={confirmRejectRequest}
        title="Reject Request"
        message="Are you sure you want to reject this room request? This action cannot be undone."
        confirmText="Yes, Reject"
        cancelText="Cancel"
        loading={isProcessing}
      />
    </div>
  );
}
