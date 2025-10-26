import { RoomForm as ItemForm } from "@/types/host/room";
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
  district?: number;
  maxCapacity?: string;
}

export const getDistricts = async () => {
  const response = await axiosInstance.get(AppApis.districts.all, {
    params: { size: 100 },
  });
  return response.data;
};

export const getAllRoomsForHost = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  minPrice,
  maxPrice,
  roomType,
  district,
  maxCapacity,
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
  if (district !== undefined) params.district = district;
  if (maxCapacity) params.maxCapacity = maxCapacity;

  const response = await axiosInstance.get(AppApis.rooms.getByHost, {
    params,
  });
  return response.data;
};

export const getSingleRoomForHost = async (slug: string) => {
  const response = await axiosInstance.get(
    AppApis.rooms.getSingleForHost(slug)
  );
  return response.data;
};

export const addRoom = async (data: ItemForm) => {
  const response = await axiosInstance.post(AppApis.rooms.create, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateRoom = async (data: ItemForm, slug: string) => {
  const response = await axiosInstance.put(AppApis.rooms.update(slug), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteRoom = async (slug: string) => {
  const response = await axiosInstance.delete(AppApis.rooms.delete(slug));
  return response.data;
};
