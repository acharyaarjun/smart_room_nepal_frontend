"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaRupeeSign, FaTimes } from "react-icons/fa";
import { Filters } from "@/types/room/filters";
import { District } from "@/types/user/district";
import RoomType from "@/enums/roomType";
import MaxCapacity from "@/enums/maxCapacity";
import { SelectElement } from "@/components/common/form-element";
import LocationFilter from "./LocationFilter";

interface HorizontalFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  setShowFilters: (val: boolean) => void;
  availableAmenities: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    iconName: string;
  }[];
  districts: District[];
}

const HorizontalFilters: React.FC<HorizontalFiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
  setShowFilters,
  availableAmenities,
  districts,
}) => {
  const [tempFilters, setTempFilters] = useState<Filters>({ ...filters });

  useEffect(() => {
    setTempFilters({ ...filters });
  }, [filters]);

  const handleAmenityChange = (amenityId: string) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleLocationChange = (locationSlug: string) => {
    setTempFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(locationSlug)
        ? prev.locations.filter((loc) => loc !== locationSlug)
        : [...prev.locations, locationSlug],
    }));
  };

  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setShowFilters(false); // Optional: close filter panel
  };

  // Convert enums to readable labels
  const getRoomTypeLabel = (value: string): string => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getMaxCapacityLabel = (value: string): string => {
    return value.replace("_", " ");
  };

  // Prepare options for select components
  const roomTypeOptions = useMemo(
    () =>
      Object.values(RoomType).map((type) => ({
        value: type,
        label: getRoomTypeLabel(type),
      })),
    []
  );

  const maxCapacityOptions = useMemo(
    () =>
      Object.values(MaxCapacity).map((capacity) => ({
        value: capacity,
        label: getMaxCapacityLabel(capacity),
      })),
    []
  );

  return (
    <div className="bg-white dark:bg-dropdown rounded-xl p-6 shadow-custom mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Quick Filters
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Clear All
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={16} />
          </button>
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Location Filter */}
        <div className="col-span-2">
          <LocationFilter
            latitude={tempFilters.latitude}
            longitude={tempFilters.longitude}
            radius={tempFilters.radius}
            onLocationChange={(lat, lng, radius) =>
              setTempFilters((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
                radius: radius,
              }))
            }
          />
        </div>

        {/* Room Name */}
        <div>
          <label className="block font-medium text-normal mb-2">
            Room Name
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search room..."
              value={tempFilters.search}
              onChange={(e) =>
                setTempFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-medium text-normal mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="number"
                placeholder="Min"
                value={tempFilters.minPrice}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div className="relative flex-1">
              <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="number"
                placeholder="Max"
                value={tempFilters.maxPrice}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <SelectElement
            title="Room Type"
            placeholder="Select room type"
            value={tempFilters.roomType || null}
            name="roomType"
            error={null}
            onChange={(value) =>
              setTempFilters((prev) => ({ ...prev, roomType: value || "" }))
            }
            onBlur={() => {}}
            options={roomTypeOptions}
          />
        </div>

        {/* Max Capacity */}
        <div>
          <SelectElement
            title="Max Capacity"
            placeholder="Select max capacity"
            value={tempFilters.maxCapacity || null}
            name="maxCapacity"
            error={null}
            onChange={(value) =>
              setTempFilters((prev) => ({ ...prev, maxCapacity: value || "" }))
            }
            onBlur={() => {}}
            options={maxCapacityOptions}
          />
        </div>
      </div>

      {/* Locations */}
      <div className="my-3">
        <label className="block font-medium text-normal mb-2">Locations</label>
        <div className="flex flex-wrap gap-2 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2 max-h-28">
          {districts.map((district) => (
            <label
              key={district.id}
              className="flex items-center gap-2 cursor-pointer px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-primary/20 dark:hover:bg-primary/30"
            >
              <input
                type="checkbox"
                checked={tempFilters.locations.includes(district.slug)}
                onChange={() => handleLocationChange(district.slug)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-normal">{district.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="my-3">
        <label className="block font-medium text-normal mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2 max-h-28">
          {availableAmenities.map((amenity) => {
            const AmenityIcon = amenity.icon;
            return (
              <label
                key={amenity.id}
                className="flex items-center gap-2 cursor-pointer px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-primary/20 dark:hover:bg-primary/30"
              >
                <input
                  type="checkbox"
                  checked={tempFilters.amenities.includes(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <AmenityIcon
                  icon={amenity.iconName}
                  className="text-gray-600 dark:text-gray-400"
                />
                <span className="text-sm text-normal">{amenity.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default HorizontalFilters;
