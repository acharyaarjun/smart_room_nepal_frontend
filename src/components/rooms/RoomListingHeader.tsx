"use client";
import React from "react";
import { FaTh, FaList, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  isLongView: boolean;
  setIsLongView: (val: boolean) => void;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  totalRooms: number;
}

const RoomListingHeader: React.FC<Props> = ({
  isLongView,
  setIsLongView,
  showFilters,
  setShowFilters,
  totalRooms,
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Available Rooms
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Found {totalRooms} rooms matching your criteria
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Filter button for grid view */}
        {!isLongView && (
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
              showFilters
                ? "bg-primary text-white"
                : "bg-white dark:bg-dropdown text-normal border border-gray-300 dark:border-gray-600"
            }`}
          >
            <FaFilter className="text-sm" />
            Filters
          </motion.button>
        )}

        {/* View Toggle */}
        <div className="flex items-center bg-white dark:bg-dropdown rounded-lg p-1 shadow-custom">
          <motion.button
            onClick={() => setIsLongView(false)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              !isLongView
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <FaTh className="text-sm" />
            Grid
          </motion.button>
          <motion.button
            onClick={() => setIsLongView(true)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              isLongView
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <FaList className="text-sm" />
            List
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RoomListingHeader;
