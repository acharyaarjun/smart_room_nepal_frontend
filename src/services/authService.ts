import { AppApis } from "@/utils";
import axiosInstance from "./apiService";
import { setItemSecurely } from "@/utils/storageUtil";
import { User } from "@/types/auth/user";

export const updateProfile = async (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      formData.append(key, data[key]);
    } else {
      formData.append(key, "");
    }
  }
  const response = await axiosInstance.put(AppApis.users.me, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await axiosInstance.put(AppApis.users.changePassword, {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return response.data;
};

export const signout = async () => {
  const response = await axiosInstance.post(AppApis.auth.logout);
  return response.data;
};

/**
 * @description Refresh auth token
 * @returns {Promise<string>}
 * @example
 * const token = await refreshAuthToken();
 * @throws {Error}
 * @throws {AxiosError}
 */
export const refreshAuthToken = async (): Promise<User> => {
  const response = await axiosInstance.post(
    AppApis.auth.refreshToken,
    {},
    {
      isAuthRoute: false,
    }
  );

  setItemSecurely("user", response.data.data.user);

  return response.data.data.user;
};
