import { AppApis } from "@/utils";
import axiosInstance from "./apiService";
import { RoomRequestForm } from "@/types/user/request";
import { UpdateRoomRequestForm } from "@/types/host/request";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  roomRequestStatus?: string; // @/enums/roomRequestStatus.ts
  room?: string; // room slug
}

// for host
export const getAllRoomRequestForHost = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  roomRequestStatus,
  room,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (roomRequestStatus) params.roomRequestStatus = roomRequestStatus;
  if (room) params.room = room;

  const response = await axiosInstance.get(AppApis.rooms.requests.getByHost, {
    params,
  });
  return response.data;
};

// for user
export const getAllRoomRequestForUser = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  roomRequestStatus,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (roomRequestStatus) params.roomRequestStatus = roomRequestStatus;

  const response = await axiosInstance.get(AppApis.rooms.requests.getByUser, {
    params,
  });
  return response.data;
};

// create room request by user
export const createRoomRequest = async (
  data: RoomRequestForm,
  slug: string
) => {
  const response = await axiosInstance.post(
    AppApis.rooms.requests.create(slug),
    data
  );
  return response.data;
};

// update room request by host only when status is pending
export const updateRoomRequest = async (
  data: UpdateRoomRequestForm,
  token: string // request token
) => {
  const response = await axiosInstance.put(
    AppApis.rooms.requests.update(token),
    data
  );
  return response.data;
};

// cancel room request by user only when status is pending
export const cancelRoomRequest = async (token: string) => {
  const response = await axiosInstance.put(
    AppApis.rooms.requests.update(token),
    { status: "canceled" }
  );
  return response.data;
};
