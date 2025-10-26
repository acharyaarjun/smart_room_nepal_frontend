"use client";
import React, { useState } from "react";
import { Room } from "@/types/host/room";
import { deleteRoom } from "@/services/roomService";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import { Spinner } from "@/components/common";

interface Props {
  room: Room;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteConfirmModal({
  room,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteRoom(room.slug);

      if (response.status === 200) {
        toast.success("Room deleted successfully", { id: "toast" });
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room", { id: "toast" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-dropdown rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-normal flex items-center gap-2">
            <FiAlertTriangle className="w-5 h-5 text-red-500" />
            Confirm Delete
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={loading}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-normal mb-4">
            Are you sure you want to delete this room?
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-normal mb-1">{room.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {room.district.name} • {room.roomType.replace("_", " ")}
            </p>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mt-4">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-normal rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="w-4 h-4" />
                Deleting...
              </>
            ) : (
              "Delete Room"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
