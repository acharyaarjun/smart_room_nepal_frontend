"use client";
import React, { useState, useEffect } from "react";
import {
  getAllRoomsMedias,
  addRoomMedia,
  deleteRoomMedia,
} from "@/services/roomMediaService";
import { RoomMedia } from "@/types/host/media";
import { DefaultSkeleton, ConfirmDialog } from "@/components/common";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";
import { getProxiedImageUrl } from "@/utils";
import GetIconFromMimeType from "@/components/common/GetIconFromMimeType";
import { FileSelectElement } from "@/components/common/form-element";

interface Props {
  roomSlug: string;
}

export default function RoomMediaTab({ roomSlug }: Props) {
  const [medias, setMedias] = useState<RoomMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    mediaId: number | null;
    mediaName: string;
  }>({
    isOpen: false,
    mediaId: null,
    mediaName: "",
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMedias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomSlug]);

  const fetchMedias = async () => {
    try {
      setLoading(true);
      const response = await getAllRoomsMedias({
        roomSlug,
        size: 100,
      });
      if (response.status === 200) {
        setMedias(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching medias:", error);
      toast.error("Failed to load media files");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedFiles([]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("medias", file);
      });

      await addRoomMedia(formData as any, roomSlug);
      toast.success("Media files uploaded successfully");
      handleCloseModal();
      fetchMedias();
    } catch (error: any) {
      console.error("Error uploading media:", error);
      toast.error(error?.response?.data?.message || "Failed to upload media");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (mediaId: number) => {
    try {
      setDeleting(true);
      await deleteRoomMedia(mediaId);
      toast.success("Media deleted successfully");
      setDeleteConfirm({ isOpen: false, mediaId: null, mediaName: "" });
      fetchMedias();
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media");
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteConfirm = (media: RoomMedia) => {
    setDeleteConfirm({
      isOpen: true,
      mediaId: media.id,
      mediaName: media.media.fileName,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-normal">Room Media</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage photos and videos for this room
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Upload Media
        </button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : medias.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-dropdown rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-normal mb-2">
            No media files yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Upload photos or videos to showcase your room
          </p>
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Upload First Media
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {medias.map((media) => (
            <div
              key={media.id}
              className="relative bg-white dark:bg-dropdown border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
                {media.media.mimeType.startsWith("image/") ? (
                  <Image
                    src={getProxiedImageUrl(media.media.url)}
                    alt={media.media.fileName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-6xl">
                      <GetIconFromMimeType mimeType={media.media.mimeType} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-normal truncate">
                  {media.media.fileName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {media.media.mimeType}
                </p>
              </div>
              <button
                onClick={() => openDeleteConfirm(media)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dropdown rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-normal">
                Upload Media Files
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FileSelectElement
                title="Select Files"
                name="medias"
                value={selectedFiles}
                onChange={handleFileChange}
                onBlur={() => {}}
                error={null}
                multiple
                accept="image/*,video/*"
                placeholder="Upload images or videos (Max 10MB each)"
              />

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-normal">
                    Selected Files ({selectedFiles.length})
                  </p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() =>
          setDeleteConfirm({ isOpen: false, mediaId: null, mediaName: "" })
        }
        onConfirm={() => {
          if (deleteConfirm.mediaId) {
            handleDelete(deleteConfirm.mediaId);
          }
        }}
        title="Delete Media"
        message={`Are you sure you want to delete "${deleteConfirm.mediaName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="red"
        loading={deleting}
      />
    </div>
  );
}
