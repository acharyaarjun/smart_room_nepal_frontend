import { AppApis } from "@/utils";
import axiosInstance from "./apiService";
import { ReviewForm } from "@/types/user/review";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  room?: string; // room slug
  rating?: number; // 1 to 5
}

export const getAllRoomReviewsForHost = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  room,
  rating,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (room) params.room = room;
  if (rating !== undefined) params.rating = rating;

  const response = await axiosInstance.get(AppApis.rooms.reviews.getByHost, {
    params,
  });
  return response.data;
};
export const getAllRoomReviewsForUser = async ({
  page = 1,
  size = 10,
  search = "",
  sort,
  order,
  room,
  rating,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (room) params.room = room;
  if (rating !== undefined) params.rating = rating;

  const response = await axiosInstance.get(AppApis.rooms.reviews.getByUser, {
    params,
  });
  return response.data;
};

// create room review by user
export const createRoomReview = async (
  data: ReviewForm,
  roomRequestId: number
) => {
  const response = await axiosInstance.post(
    AppApis.rooms.reviews.create(roomRequestId),
    data
  );
  return response.data;
};

// update room review by user
export const updateRoomReview = async (data: ReviewForm, reviewId: number) => {
  const response = await axiosInstance.put(
    AppApis.rooms.reviews.update(reviewId),
    data
  );
  return response.data;
};

// delete room review by user
export const deleteRoomReview = async (reviewId: number) => {
  const response = await axiosInstance.delete(
    AppApis.rooms.reviews.delete(reviewId)
  );
  return response.data;
};
