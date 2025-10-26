"use client";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";

interface Props {
  title: string;
  isRequired?: boolean;
  latitude: number | string;
  longitude: number | string;
  onLocationChange: (lat: number, lng: number) => void;
  error: string | null;
  disabled?: boolean;
}

export default function LocationPicker({
  title,
  isRequired = false,
  latitude,
  longitude,
  onLocationChange,
  error,
  disabled = false,
}: Props) {
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [gettingLocation, setGettingLocation] = useState(false);

  // Initialize from props
  useEffect(() => {
    const latValue = latitude?.toString() || "";
    const lngValue = longitude?.toString() || "";

    setLat(latValue);
    setLng(lngValue);
  }, [latitude, longitude]);

  const handleLatChange = (value: string) => {
    setLat(value);
    const numValue = parseFloat(value);
    const numLng = parseFloat(lng);
    if (!isNaN(numValue) && !isNaN(numLng)) {
      onLocationChange(numValue, numLng);
    }
  };

  const handleLngChange = (value: string) => {
    setLng(value);
    const numValue = parseFloat(value);
    const numLat = parseFloat(lat);
    if (!isNaN(numLat) && !isNaN(numValue)) {
      onLocationChange(numLat, numValue);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat.toString());
          setLng(newLng.toString());
          onLocationChange(newLat, newLng);
          setGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your current location. Please enter manually.");
          setGettingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const openInMaps = () => {
    const numLat = parseFloat(lat);
    const numLng = parseFloat(lng);
    if (!isNaN(numLat) && !isNaN(numLng)) {
      window.open(
        `https://www.google.com/maps?q=${numLat},${numLng}`,
        "_blank"
      );
    }
  };

  return (
    <div className="w-full">
      <label className="block text-normal font-medium mb-1">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </label>

      {/* Manual Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g., 27.7172"
            value={lat}
            onChange={(e) => handleLatChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2.5 border rounded-lg shadow-sm focus:outline-none sm:text-sm transition
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-primary dark:border-gray-600"
              }
              disabled:bg-gray-100 disabled:dark:bg-dropdown disabled:cursor-not-allowed bg-transparent`}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g., 85.3240"
            value={lng}
            onChange={(e) => handleLngChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2.5 border rounded-lg shadow-sm focus:outline-none sm:text-sm transition
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-primary dark:border-gray-600"
              }
              disabled:bg-gray-100 disabled:dark:bg-dropdown disabled:cursor-not-allowed bg-transparent`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
          disabled={disabled || gettingLocation}
        >
          <FiNavigation className="w-4 h-4" />
          {gettingLocation ? "Getting Location..." : "Use Current Location"}
        </button>

        {lat && lng && (
          <button
            type="button"
            onClick={openInMaps}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            disabled={disabled}
          >
            <FiMapPin className="w-4 h-4" />
            View on Google Maps
          </button>
        )}
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Click &quot;Use Current Location&quot; or enter coordinates manually.
        You can also search for coordinates on Google Maps.
      </p>

      {error && <p className="text-sm text-red-500 italic mt-1">{error}</p>}
    </div>
  );
}
