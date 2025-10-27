"use client";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Filters } from "@/types/room/filters";
import { District } from "@/types/user/district";

interface SidebarFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  availableAmenities: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    iconName: string;
  }[];
  districts: District[];
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
  availableAmenities,
  districts,
}) => {
  // Local temporary state
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

  const handleLocationChange = (locationName: string) => {
    setTempFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(locationName)
        ? prev.locations.filter((loc) => loc !== locationName)
        : [...prev.locations, locationName],
    }));
  };

  const applyFilters = () => {
    setFilters({ ...tempFilters });
  };

  return (
    <div className="bg-white dark:bg-dropdown rounded-xl p-6 shadow-custom sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className=" text-primary hover:text-primary-dark font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Room Name Search */}
      <div className="mb-6">
        <label className="block  font-semibold text-normal mb-2">
          Search Room
        </label>
        <input
          type="text"
          placeholder="Enter room name..."
          value={tempFilters.search}
          onChange={(e) =>
            setTempFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block font-semibold text-normal mb-2">
          Price Range (Monthly)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
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
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white "
            />
          </div>
          <div className="relative">
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
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white "
            />
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="mb-6">
        <label className="block font-semibold text-normal mb-3">
          Locations
        </label>
        <div className="space-y-3 max-h-52 overflow-y-auto">
          {districts.map((district) => (
            <label
              key={district.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={tempFilters.locations.includes(district.name)}
                onChange={() => handleLocationChange(district.name)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className=" text-normal">{district.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block font-semibold text-normal mb-3">
          Amenities
        </label>
        <div className="space-y-3 max-h-52 overflow-y-auto">
          {availableAmenities.map((amenity) => {
            const AmenityIcon = amenity.icon;
            return (
              <label
                key={amenity.id}
                className="flex items-center gap-3 cursor-pointer"
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
                <span className=" text-normal">{amenity.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Apply Filters Button */}
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

export default SidebarFilters;
