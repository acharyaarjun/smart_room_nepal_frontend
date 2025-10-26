"use client";
import { Room } from "@/types/host/room";
import Image from "next/image";
import { FiEdit2, FiMapPin, FiUsers, FiDollarSign } from "react-icons/fi";
import RoomStatus from "@/enums/roomStatus";
import { getProxiedImageUrl } from "@/utils";

interface Props {
  room: Room;
  onEdit: (slug: string) => void;
}

export default function RoomCard({ room, onEdit }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case RoomStatus.APPROVED:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case RoomStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case RoomStatus.MAINTENANCE:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case RoomStatus.DISABLED_BY_ADMIN:
      case RoomStatus.DISABLED_BY_OWNER:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="bg-white dark:bg-dropdown border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto bg-gray-200 dark:bg-gray-700">
          {room.image?.url ? (
            <Image
              src={getProxiedImageUrl(room.image.url)}
              alt={room.name}
              className="object-cover h-full w-full"
              height={400}
              width={400}
              quality={100}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
          {room.isFeatured && (
            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-normal mb-1">
                {room.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {room.shortDescription}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                room.roomStatus
              )}`}
            >
              {formatStatus(room.roomStatus)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 capitalize">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiMapPin className="w-4 h-4" />
              <span>{room.district.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiUsers className="w-4 h-4" />
              <span>{room.maxCapacity.replace("_", " ")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiDollarSign className="w-4 h-4" />
              <span>
                NPR {room.offerPrice || room.price}/{room.unit}
                {room.offerPrice && (
                  <span className="line-through ml-1 text-gray-400">
                    NPR {room.price}
                  </span>
                )}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Type: {room.roomType.replace("_", " ")}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500">
              Created: {new Date(room.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(room.slug)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
