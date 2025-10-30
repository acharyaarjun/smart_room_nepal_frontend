"use client";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiNavigation, FiX } from "react-icons/fi";

interface LocationFilterProps {
  latitude?: number;
  longitude?: number;
  radius?: number;
  onLocationChange: (lat?: number, lng?: number, radius?: number) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  latitude,
  longitude,
  radius,
  onLocationChange,
}) => {
  const [lat, setLat] = useState<string>(latitude?.toString() || "");
  const [lng, setLng] = useState<string>(longitude?.toString() || "");
  const [radiusValue, setRadiusValue] = useState<string>(
    radius?.toString() || "10"
  );
  const [gettingLocation, setGettingLocation] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setLat(latitude?.toString() || "");
    setLng(longitude?.toString() || "");
    setRadiusValue(radius?.toString() || "10");
    setIsEnabled(!!(latitude && longitude));
  }, [latitude, longitude, radius]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat.toString());
          setLng(newLng.toString());
          setIsEnabled(true);
          onLocationChange(newLat, newLng, parseFloat(radiusValue) || 10);
          setGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your current location. Please check permissions."
          );
          setGettingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleRadiusChange = (value: string) => {
    setRadiusValue(value);
    const numLat = parseFloat(lat);
    const numLng = parseFloat(lng);
    const numRadius = parseFloat(value);

    if (!isNaN(numLat) && !isNaN(numLng) && !isNaN(numRadius) && isEnabled) {
      onLocationChange(numLat, numLng, numRadius);
    }
  };

  const handleLatChange = (value: string) => {
    setLat(value);
    const numLat = parseFloat(value);
    const numLng = parseFloat(lng);
    const numRadius = parseFloat(radiusValue);

    if (!isNaN(numLat) && !isNaN(numLng) && !isNaN(numRadius) && isEnabled) {
      onLocationChange(numLat, numLng, numRadius);
    }
  };

  const handleLngChange = (value: string) => {
    setLng(value);
    const numLat = parseFloat(lat);
    const numLng = parseFloat(value);
    const numRadius = parseFloat(radiusValue);

    if (!isNaN(numLat) && !isNaN(numLng) && !isNaN(numRadius) && isEnabled) {
      onLocationChange(numLat, numLng, numRadius);
    }
  };

  const clearLocation = () => {
    setLat("");
    setLng("");
    setRadiusValue("10");
    setIsEnabled(false);
    onLocationChange(undefined, undefined, undefined);
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

  const toggleLocation = () => {
    if (isEnabled) {
      clearLocation();
    } else {
      getCurrentLocation();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block font-semibold text-normal">
          Search Near Location
        </label>
        <button
          onClick={toggleLocation}
          className={`px-3 py-1 text-xs rounded-lg transition ${
            isEnabled
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200"
              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200"
          }`}
        >
          {isEnabled ? "Disable" : "Enable"}
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Get Current Location Button */}
          <button
            type="button"
            onClick={getCurrentLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            disabled={gettingLocation}
          >
            <FiNavigation className="w-4 h-4" />
            {gettingLocation ? "Getting Location..." : "Use My Location"}
          </button>

          {/* Manual Input */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="27.7172"
                value={lat}
                onChange={(e) => handleLatChange(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="85.3240"
                value={lng}
                onChange={(e) => handleLngChange(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Radius */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Search Radius (km)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              value={radiusValue}
              onChange={(e) => handleRadiusChange(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">1 km</span>
              <span className="text-xs text-gray-500">100 km</span>
            </div>
          </div>

          {/* View on Map */}
          {lat && lng && (
            <button
              type="button"
              onClick={openInMaps}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiMapPin className="w-4 h-4" />
              View on Google Maps
            </button>
          )}

          {/* Clear Button */}
          <button
            type="button"
            onClick={clearLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FiX className="w-4 h-4" />
            Clear Location
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Enable to search for rooms within a specific radius of a location.
      </p>
    </div>
  );
};

export default LocationFilter;
