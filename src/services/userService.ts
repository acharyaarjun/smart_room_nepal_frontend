import { AppApis } from "@/utils";
import axiosInstance from "./apiService";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;
  maxCapacity?: string;
  districts?: string; // comma separated district slugs
  amenities?: string; // comma separated amenity IDs
}

export const getDistricts = async () => {
  const response = await axiosInstance.get(AppApis.districts.all, {
    params: { size: 100 },
  });
  return response.data;
};

export const getAmenities = async () => {
  const response = await axiosInstance.get(AppApis.amenities.all, {
    params: { size: 1000 },
  });
  return response.data;
};

export const getAllRooms = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  minPrice,
  maxPrice,
  roomType,
  maxCapacity,
  districts,
  amenities,
  isFeatured,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;
  if (roomType) params.roomType = roomType;
  if (maxCapacity) params.maxCapacity = maxCapacity;
  if (districts) params.districts = districts;
  if (amenities) params.amenities = amenities;
  if (isFeatured !== undefined) params.isFeatured = isFeatured;

  const response = await axiosInstance.get(AppApis.rooms.get, {
    params,
  });
  return response.data;
};

export const toggleWishlist = async (slug: string) => {
  const response = await axiosInstance.post(AppApis.rooms.wishlist(slug));
  return response.data;
};

export const getSingleRoom = async (slug: string) => {
  const response = await axiosInstance.get(
    AppApis.rooms.getSingleForUser(slug)
  );
  return response.data;
};
