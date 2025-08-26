import axios, { AxiosError, AxiosInstance } from "axios";

import { AppApis } from "@/utils";
import {
  clearSecureItemsAsync,
  getItemSecurely,
  setItemSecurely,
} from "@/utils/storageUtil";

declare module "axios" {
  interface AxiosRequestConfig {
    isAuthRoute?: boolean;
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  isAuthRoute: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @description Axios interceptor to add content type to the request
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getItemSecurely<string>("accessToken");

    if (config.isAuthRoute && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @description Axios interceptor to refresh auth token
 * @param {AxiosError} error
 * @returns {Promise<AxiosError>}
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        originalRequest.isAuthRoute
      ) {
        originalRequest._retry = true;

        // refresh token
        const token = await refreshAuthToken();

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      }

      throw error;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401 &&
        originalRequest.isAuthRoute
      ) {
        await clearSecureItemsAsync(["accessToken", "user"]);
        const url = new URL(window.location.href);
        const redirectUrl = url.pathname + url.search;

        //convert redirectUrl to url format so that it can be passed as a query parameter
        const newRedirectUrl = encodeURIComponent(redirectUrl);

        window.location.href = `/login?redirectTo=${newRedirectUrl}`;
      }

      return Promise.reject(error);
    }
  }
);

/**
 * @description Refresh auth token
 * @returns {Promise<string>}
 * @example
 * const token = await refreshAuthToken();
 * console.log(token);
 * @throws {Error}
 * @throws {AxiosError}
 */
const refreshAuthToken = async (): Promise<string> => {
  const accessToken = getItemSecurely<string>("accessToken");
  const response = await axiosInstance.post(
    AppApis.auth.refreshToken,
    {},
    {
      isAuthRoute: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const token = response.data.data.accessToken;

  setItemSecurely("accessToken", token);

  return token;
};

export default axiosInstance;
