import { RoomMedia as ItemForm } from "@/types/host/media";
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

export const getDistricts = async () => {
  const response = await axiosInstance.get(AppApis.districts.all, {
    params: { size: 100 },
  });
  return response.data;
};

export const getAllRoomsMedias = async ({
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
    AppApis.rooms.media.get(roomSlug || ""),
    {
      params,
    }
  );
  return response.data;
};

export const getSingleRoomForHost = async (slug: string) => {
  const response = await axiosInstance.get(
    AppApis.rooms.getSingleForHost(slug)
  );
  return response.data;
};

export const addRoomMedia = async (data: ItemForm, roomSlug: string) => {
  const response = await axiosInstance.post(
    AppApis.rooms.media.create(roomSlug),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteRoomMedia = async (mediaId: number) => {
  const response = await axiosInstance.delete(
    AppApis.rooms.media.delete(mediaId)
  );
  return response.data;
};
