"use client";
import React, { useState, useEffect } from "react";
import {
  getAllRoomAmenities,
  addRoomAmenity,
  updateRoomAmenity,
  deleteRoomAmenity,
  getAllAmenities,
} from "@/services/roomAmenityService";
import { RoomAmenity, AmenityForm } from "@/types/host/amenity";
import { Amenity } from "@/types/common/amenity";
import { DefaultSkeleton, ConfirmDialog } from "@/components/common";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import IconComponent from "@/components/common/IconComponent";
import {
  SelectElement,
  TextareaElement,
} from "@/components/common/form-element";

interface Props {
  roomSlug: string;
}

export default function RoomAmenitiesTab({ roomSlug }: Props) {
  const [amenities, setAmenities] = useState<RoomAmenity[]>([]);
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<RoomAmenity | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    amenityId: number | null;
    amenityName: string;
  }>({
    isOpen: false,
    amenityId: null,
    amenityName: "",
  });
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState<AmenityForm>({
    amenityId: 0,
    description: "",
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchAmenities();
      await fetchAllAmenities();
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomSlug]);

  const fetchAmenities = async () => {
    try {
      setLoading(true);
      const response = await getAllRoomAmenities({
        roomSlug,
        size: 100,
      });
      if (response.status === 200) {
        setAmenities(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
      toast.error("Failed to load amenities");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAmenities = async () => {
    try {
      const response = await getAllAmenities();
      if (response.status === 200) {
        setAllAmenities(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all amenities:", error);
    }
  };

  const handleOpenModal = (amenity?: RoomAmenity) => {
    if (amenity) {
      setEditingAmenity(amenity);
      setFormData({
        amenityId: amenity.amenity.id,
        description: amenity.description || "",
      });
    } else {
      setEditingAmenity(null);
      setFormData({
        amenityId: 0,
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAmenity(null);
    setFormData({
      amenityId: 0,
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amenityId === 0) {
      toast.error("Please select an amenity");
      return;
    }

    try {
      setSubmitting(true);
      if (editingAmenity) {
        await updateRoomAmenity(formData, editingAmenity.id);
        toast.success("Amenity updated successfully");
      } else {
        await addRoomAmenity(formData, roomSlug);
        toast.success("Amenity added successfully");
      }
      handleCloseModal();
      fetchAmenities();
    } catch (error: any) {
      console.error("Error saving amenity:", error);
      toast.error(error?.response?.data?.message || "Failed to save amenity");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (amenityId: number) => {
    try {
      setDeleting(true);
      await deleteRoomAmenity(amenityId);
      toast.success("Amenity deleted successfully");
      setDeleteConfirm({ isOpen: false, amenityId: null, amenityName: "" });
      fetchAmenities();
    } catch (error) {
      console.error("Error deleting amenity:", error);
      toast.error("Failed to delete amenity");
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteConfirm = (amenity: RoomAmenity) => {
    setDeleteConfirm({
      isOpen: true,
      amenityId: amenity.id,
      amenityName: amenity.amenity.name,
    });
  };

  const amenityOptions = allAmenities.map((amenity) => ({
    value: amenity.id.toString(),
    label: amenity.name,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-normal">Room Amenities</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage amenities for this room
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Amenity
        </button>
      </div>

      {/* Amenities Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <DefaultSkeleton key={i} />
          ))}
        </div>
      ) : amenities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-dropdown rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-normal mb-2">
            No amenities yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Add amenities to make your room more attractive
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add First Amenity
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white dark:bg-dropdown border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent
                      icon={amenity.amenity.icon}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-normal">
                      {amenity.amenity.name}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenModal(amenity)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(amenity)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              {amenity.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {amenity.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dropdown rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-normal">
                {editingAmenity ? "Edit Amenity" : "Add Amenity"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <SelectElement
                title="Amenity"
                name="amenityId"
                value={
                  formData.amenityId > 0 ? formData.amenityId.toString() : null
                }
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    amenityId: value ? parseInt(value) : 0,
                  })
                }
                onBlur={() => {}}
                error={null}
                options={amenityOptions}
                placeholder="Select an amenity"
                isRequired
                disabled={!!editingAmenity}
              />

              <TextareaElement
                title="Description (Optional)"
                name="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                onBlur={() => {}}
                error={null}
                placeholder="Add a description for this amenity..."
              />

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
                  {submitting ? "Saving..." : editingAmenity ? "Update" : "Add"}
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
          setDeleteConfirm({ isOpen: false, amenityId: null, amenityName: "" })
        }
        onConfirm={() => {
          if (deleteConfirm.amenityId) {
            handleDelete(deleteConfirm.amenityId);
          }
        }}
        title="Delete Amenity"
        message={`Are you sure you want to delete "${deleteConfirm.amenityName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="red"
        loading={deleting}
      />
    </div>
  );
}
