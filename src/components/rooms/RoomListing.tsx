"use client";
import { Room } from "@/types/user/room";
import { useState, useMemo, useEffect } from "react";
import { SingleRoomItem } from "@/components/rooms";
import { AnimatePresence } from "framer-motion";
import {
  RoomListingHeader,
  HorizontalFilters,
  SidebarFilters,
} from "@/components/rooms";
import { Pagination } from "@/components/common";
import { Filters } from "@/types/room/filters";
import { District } from "@/types/user/district";
import { Amenity } from "@/types/user/amenity";
import { IconComponent } from "@/components/common";
import { getAllRooms } from "@/services/userService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface RoomListingProps {
  districts: District[];
  amenities: Amenity[];
}

export default function RoomListing({
  districts,
  amenities,
}: RoomListingProps) {
  const searchParams = useSearchParams();
  const [isLongView, setIsLongView] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    amenities: [],
    locations: [],
    maxCapacity: "",
    roomType: "",
    latitude: undefined,
    longitude: undefined,
    radius: undefined,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const itemsPerPage = 6;

  // Initialize filters from URL params
  useEffect(() => {
    const district = searchParams.get("district");
    const roomType = searchParams.get("roomType");
    const maxCapacity = searchParams.get("maxCapacity");

    // Check for nearby location from home page
    const nearbyLocation = sessionStorage.getItem("nearbyLocation");
    let locationData = null;
    if (nearbyLocation) {
      try {
        locationData = JSON.parse(nearbyLocation);
        // Clear after reading
        sessionStorage.removeItem("nearbyLocation");
      } catch (e) {
        console.error("Error parsing nearby location:", e);
      }
    }

    if (district || roomType || maxCapacity || locationData) {
      // Show filters if coming from search or home page
      setShowFilters(!!locationData);

      setFilters((prev) => ({
        ...prev,
        locations: district ? [district] : prev.locations,
        roomType: roomType || prev.roomType,
        maxCapacity: maxCapacity || prev.maxCapacity,
        latitude: locationData?.latitude,
        longitude: locationData?.longitude,
        radius: locationData?.radius,
      }));

      if (locationData) {
        toast.success("Showing rooms within 10km of your location!");
      }
    }

    setIsInitialized(true);
  }, [searchParams]);

  // Transform amenities to include icons
  const availableAmenities = useMemo(() => {
    return amenities.map((amenity) => ({
      id: amenity.id.toString(),
      label: amenity.name,
      icon: IconComponent,
      iconName: amenity.icon,
    }));
  }, [amenities]);

  const clearFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      amenities: [],
      locations: [],
      maxCapacity: "",
      roomType: "",
      latitude: undefined,
      longitude: undefined,
      radius: undefined,
    });
  };

  // Fetch rooms whenever filters or page changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await getAllRooms({
          page: currentPage,
          size: itemsPerPage,
          search: filters.search || undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          roomType: filters.roomType || undefined,
          maxCapacity: filters.maxCapacity || undefined,
          districts:
            filters.locations.length > 0
              ? filters.locations.join(",")
              : undefined,
          amenities:
            filters.amenities.length > 0
              ? filters.amenities.join(",")
              : undefined,
          latitude: filters.latitude,
          longitude: filters.longitude,
          radius: filters.radius,
        });

        if (response.status === 200 && response.data) {
          setRooms(response.data.data || []);
          setTotalItems(response.data.totalItems || 0);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [filters, currentPage, isInitialized]);

  return (
    <section id="room-listing" className="w-full py-12">
      <div className="container">
        <RoomListingHeader
          isLongView={isLongView}
          setIsLongView={setIsLongView}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          totalRooms={totalItems}
        />

        <AnimatePresence>
          {!isLongView && showFilters && (
            <HorizontalFilters
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
              setShowFilters={setShowFilters}
              availableAmenities={availableAmenities}
              districts={districts}
            />
          )}
        </AnimatePresence>

        <div className="flex gap-8">
          {isLongView && (
            <div className="w-1/4 hidden lg:block">
              <SidebarFilters
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                availableAmenities={availableAmenities}
                districts={districts}
              />
            </div>
          )}

          <div className={`${isLongView ? "w-full lg:w-3/4" : "w-full"}`}>
            {loading ? (
              <div className="text-center py-12 bg-primary/10 rounded-lg italic text-gray-600 dark:text-gray-300">
                Loading rooms...
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-12 bg-primary/10 rounded-lg italic text-gray-600 dark:text-gray-300">
                No rooms found!
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  isLongView
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {rooms.map((room: Room) => (
                  <SingleRoomItem
                    key={room.id}
                    room={room}
                    isLong={isLongView}
                  />
                ))}
              </div>
            )}

            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
