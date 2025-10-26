"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoomForm as RoomFormType } from "@/types/host/room";
import {
  InputElement,
  TextareaElement,
  SelectElement,
  FileSelectElement,
} from "@/components/common/form-element";
import { LocationPicker, Spinner } from "@/components/common";
import {
  addRoom,
  updateRoom,
  getSingleRoomForHost,
  getDistricts,
} from "@/services/roomService";
import RoomType from "@/enums/roomType";
import MaxCapacity from "@/enums/maxCapacity";
import RoomUnit from "@/enums/roomUnit";
import toast from "react-hot-toast";
import { AppConsts, getProxiedImageUrl } from "@/utils";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";

interface Props {
  action: string;
  slug?: string;
}

export default function RoomForm({ action, slug }: Props) {
  const router = useRouter();
  const isEditMode = action === "edit" && slug;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!isEditMode);
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >([]);

  const [formData, setFormData] = useState<RoomFormType>({
    name: "",
    shortDescription: "",
    description: "",
    price: 0,
    offerPrice: undefined,
    longitude: "",
    latitude: "",
    districtId: 0,
    address: "",
    roomType: "",
    maxCapacity: "",
    unit: "",
  });

  const [imageFile, setImageFile] = useState<File[] | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Convert backend image URL to use Next.js proxy

  // Fetch districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await getDistricts();
        if (response.status === 200) {
          const districtOptions = response.data.data.map((district: any) => ({
            value: district.id.toString(),
            label: district.name,
          }));
          setDistricts(districtOptions);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        toast.error("Failed to fetch districts", { id: "toast" });
      }
    };

    fetchDistricts();
  }, []);

  // Fetch room data for edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchRoom = async () => {
        try {
          setInitialLoading(true);
          const response = await getSingleRoomForHost(slug);

          if (response.status === 200) {
            const room = response.data;

            setFormData({
              name: room.name,
              shortDescription: room.shortDescription,
              description: room.description,
              price: room.price,
              offerPrice: room.offerPrice || undefined,
              longitude: room.longitude.toString(),
              latitude: room.latitude.toString(),
              districtId: room.district.id,
              address: room.address,
              roomType: room.roomType,
              maxCapacity: room.maxCapacity,
              unit: room.unit,
            });

            // Set current image URL if available
            if (room.image?.url) {
              setCurrentImageUrl(room.image.url);
            }
          }
        } catch (error) {
          console.error("Error fetching room:", error);
          toast.error("Failed to fetch room details", { id: "toast" });
          router.push(AppConsts.DASHBOARD_ROOMS_URL);
        } finally {
          setInitialLoading(false);
        }
      };

      fetchRoom();
    }
  }, [isEditMode, slug, router]);

  // Room Type options
  const roomTypeOptions = Object.values(RoomType).map((type) => ({
    value: type,
    label: type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  // Max Capacity options
  const maxCapacityOptions = Object.values(MaxCapacity).map((capacity) => ({
    value: capacity,
    label: capacity.replace(/_/g, " "),
  }));

  // Unit options
  const unitOptions = Object.values(RoomUnit).map((unit) => ({
    value: unit,
    label: unit.charAt(0).toUpperCase() + unit.slice(1),
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "offerPrice"
          ? parseFloat(value) || 0
          : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "districtId" ? (value ? parseInt(value) : 0) : value || "",
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (files: File[]) => {
    setImageFile(files);
    // Clear current image when new file is selected
    if (files && files.length > 0) {
      setCurrentImageUrl(null);
    }
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    if (errors.latitude) {
      setErrors((prev) => ({ ...prev, latitude: "" }));
    }
    if (errors.longitude) {
      setErrors((prev) => ({ ...prev, longitude: "" }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors: Record<string, string> = {};

    switch (field) {
      case "name":
        if (!formData.name.trim()) newErrors.name = "Room name is required";
        break;
      case "shortDescription":
        if (!formData.shortDescription.trim())
          newErrors.shortDescription = "Short description is required";
        break;
      case "description":
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        break;
      case "price":
        if (formData.price <= 0)
          newErrors.price = "Price must be greater than 0";
        break;
      case "address":
        if (!formData.address.trim()) newErrors.address = "Address is required";
        break;
      case "roomType":
        if (!formData.roomType) newErrors.roomType = "Room type is required";
        break;
      case "maxCapacity":
        if (!formData.maxCapacity)
          newErrors.maxCapacity = "Max capacity is required";
        break;
      case "districtId":
        if (formData.districtId === 0)
          newErrors.districtId = "District is required";
        break;
      case "unit":
        if (!formData.unit) newErrors.unit = "Unit is required";
        break;
      case "latitude":
        if (!formData.latitude) newErrors.latitude = "Latitude is required";
        break;
      case "longitude":
        if (!formData.longitude) newErrors.longitude = "Longitude is required";
        break;
      case "image":
        if (!isEditMode && (!imageFile || imageFile.length === 0))
          newErrors.image = "Room image is required";
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const fields = [
      "name",
      "shortDescription",
      "description",
      "price",
      "address",
      "roomType",
      "maxCapacity",
      "districtId",
      "unit",
      "latitude",
      "longitude",
    ];
    if (!isEditMode) fields.push("image");

    let isValid = true;
    fields.forEach((field) => {
      const fieldValid = validateField(field);
      if (!fieldValid) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const touchedObj: Record<string, boolean> = {};
    allFields.forEach((field) => {
      touchedObj[field] = true;
    });
    setTouched(touchedObj);

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly", {
        id: "toast",
      });
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          submitData.append(key, value.toString());
        }
      });

      if (imageFile && imageFile.length > 0) {
        submitData.append("image", imageFile[0]);
      }

      let response;
      if (isEditMode) {
        response = await updateRoom(submitData as any, slug);
        toast.success("Room updated successfully", { id: "toast" });
      } else {
        response = await addRoom(submitData as any);
        toast.success("Room created successfully", { id: "toast" });
      }

      if (response.status === 200 || response.status === 201) {
        router.push(AppConsts.DASHBOARD_ROOMS_URL);
      }
    } catch (error: any) {
      console.error("Error saving room:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save room";
      toast.error(errorMessage, { id: "toast" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-2">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push(AppConsts.DASHBOARD_ROOMS_URL)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Rooms
        </button>
        <h1 className="text-2xl font-bold text-normal">
          {isEditMode ? "Edit Room" : "Add New Room"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isEditMode
            ? "Update your room details"
            : "Fill in the details to add a new room"}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dropdown rounded-lg p-6 shadow-md"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-normal mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <InputElement
                title="Room Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleBlur("name")}
                error={touched.name ? errors.name || null : null}
                placeholder="Enter room name"
                isRequired
              />
              <InputElement
                title="Short Description"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                onBlur={() => handleBlur("shortDescription")}
                error={
                  touched.shortDescription
                    ? errors.shortDescription || null
                    : null
                }
                placeholder="Brief description of the room"
                isRequired
              />
              <TextareaElement
                title="Full Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onBlur={() => handleBlur("description")}
                error={touched.description ? errors.description || null : null}
                placeholder="Detailed description of the room"
                isRequired
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-normal mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputElement
                title="Price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={() => handleBlur("price")}
                error={touched.price ? errors.price || null : null}
                placeholder="0"
                inputMode="numeric"
                // min={0}
                isRequired
              />
              <InputElement
                title="Offer Price"
                name="offerPrice"
                type="text"
                value={formData.offerPrice || ""}
                onChange={handleInputChange}
                onBlur={() => handleBlur("offerPrice")}
                error={null}
                placeholder="Optional"
                inputMode="numeric"
                // min={0}
              />
              <SelectElement
                title="Unit"
                name="unit"
                value={formData.unit}
                onChange={(value) => handleSelectChange("unit", value)}
                onBlur={() => handleBlur("unit")}
                error={touched.unit ? errors.unit || null : null}
                options={unitOptions}
                placeholder="Select unit"
                isRequired
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-normal mb-4">Location</h3>
            <div className="grid grid-cols-1 gap-4">
              <SelectElement
                title="District"
                name="districtId"
                value={
                  formData.districtId ? formData.districtId.toString() : null
                }
                onChange={(value) => handleSelectChange("districtId", value)}
                onBlur={() => handleBlur("districtId")}
                error={touched.districtId ? errors.districtId || null : null}
                options={districts}
                placeholder="Select district"
                isRequired
              />
              <InputElement
                title="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={() => handleBlur("address")}
                error={touched.address ? errors.address || null : null}
                placeholder="Enter full address"
                isRequired
              />

              {/* Location Picker */}
              <LocationPicker
                title="Coordinates"
                latitude={formData.latitude}
                longitude={formData.longitude}
                onLocationChange={handleLocationChange}
                error={
                  (touched.latitude && errors.latitude) ||
                  (touched.longitude && errors.longitude) ||
                  null
                }
                isRequired
              />
            </div>
          </div>

          {/* Room Details */}
          <div>
            <h3 className="text-lg font-semibold text-normal mb-4">
              Room Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectElement
                title="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={(value) => handleSelectChange("roomType", value)}
                onBlur={() => handleBlur("roomType")}
                error={touched.roomType ? errors.roomType || null : null}
                options={roomTypeOptions}
                placeholder="Select room type"
                isRequired
              />
              <SelectElement
                title="Max Capacity"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={(value) => handleSelectChange("maxCapacity", value)}
                onBlur={() => handleBlur("maxCapacity")}
                error={touched.maxCapacity ? errors.maxCapacity || null : null}
                options={maxCapacityOptions}
                placeholder="Select capacity"
                isRequired
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h3 className="text-lg font-semibold text-normal mb-4">
              Room Image
            </h3>

            {/* Current Image Preview (Edit Mode) */}
            {isEditMode && currentImageUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Current Image:
                </p>
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                  <Image
                    src={getProxiedImageUrl(currentImageUrl)}
                    alt="Current room image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Upload a new image below to replace this one
                </p>
              </div>
            )}

            <FileSelectElement
              title={
                isEditMode && currentImageUrl
                  ? "Upload New Image (Optional)"
                  : "Upload Image"
              }
              name="image"
              value={imageFile}
              onChange={handleFileChange}
              onBlur={() => handleBlur("image")}
              error={touched.image ? errors.image || null : null}
              accept="image/*"
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
              placeholder="Click to upload or drag and drop (Max 5MB)"
              isRequired={!isEditMode}
            />
            {isEditMode && !currentImageUrl && (
              <p className="text-xs text-gray-500 mt-2">
                No current image. Please upload an image.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push(AppConsts.DASHBOARD_ROOMS_URL)}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-normal rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="w-5 h-5" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  {isEditMode ? "Update Room" : "Create Room"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
