import { AppApis } from "@/utils";
import axiosInstance from "./apiService";

export const getUserDashboard = async () => {
  const response = await axiosInstance.get(AppApis.dashboard.user);
  return response.data;
};
export const getHostDashboard = async () => {
  const response = await axiosInstance.get(AppApis.dashboard.host);
  return response.data;
};
