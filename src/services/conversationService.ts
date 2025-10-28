import { AppApis } from "@/utils";
import axiosInstance from "./apiService";

interface GetConversationsParams {
  roomRequestId: number;
  page?: number;
  size?: number;
}

/**
 * Get conversation history for a room request
 */
export const getConversations = async ({
  roomRequestId,
  page = 1,
  size = 50,
}: GetConversationsParams) => {
  const response = await axiosInstance.get(
    AppApis.rooms.requests.conversations.get(roomRequestId),
    {
      params: { page, size },
    }
  );
  return response.data;
};

/**
 * Get unread message count for a room request
 */
export const getUnreadCount = async (roomRequestId: number) => {
  const response = await axiosInstance.get(
    AppApis.rooms.requests.conversations.unreadCount(roomRequestId)
  );
  return response.data;
};

/**
 * Get all room requests with unread message counts
 */
export const getUnreadSummary = async () => {
  const response = await axiosInstance.get(
    AppApis.rooms.requests.conversations.unreadSummary
  );
  return response.data;
};
