import { AmenityForm as ItemForm } from "@/types/host/amenity";
import { AppApis } from "@/utils";
import axiosInstance from "./apiService";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  roomSlug?: string;
}

export const getAllAmenities = async () => {
  const response = await axiosInstance.get(AppApis.amenities.all, {
    params: { size: 500 },
  });
  return response.data;
};

export const getAllRoomAmenities = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  roomSlug,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const response = await axiosInstance.get(
    AppApis.rooms.amenities.get(roomSlug || ""),
    {
      params,
    }
  );
  return response.data;
};

export const addRoomAmenity = async (data: ItemForm, roomSlug: string) => {
  const response = await axiosInstance.post(
    AppApis.rooms.amenities.create(roomSlug),
    data
  );
  return response.data;
};

export const updateRoomAmenity = async (data: ItemForm, amenityId: number) => {
  const response = await axiosInstance.put(
    AppApis.rooms.amenities.update(amenityId),
    data
  );
  return response.data;
};

export const deleteRoomAmenity = async (amenityId: number) => {
  const response = await axiosInstance.delete(
    AppApis.rooms.amenities.delete(amenityId)
  );
  return response.data;
};
