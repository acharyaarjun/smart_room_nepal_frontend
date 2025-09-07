import { Login } from "@/types/auth/guest";
import axiosInstance from "./apiService";
import { AppApis } from "@/utils";

export const login = async (formData: Login) => {
  const response = await axiosInstance.post(
    AppApis.auth.login,
    {
      email: formData.email,
      password: formData.password,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post(
    AppApis.passwordReset.forgotPassword,
    {
      email,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const validateResetPasswordOtp = async (
  otp: string,
  resetToken: string
) => {
  try {
    const response = await axiosInstance.post(
      AppApis.passwordReset.verifyOTP,
      {
        otp: otp,
        resetToken: resetToken,
      },
      {
        isAuthRoute: false,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (
  otp: string,
  resetToken: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axiosInstance.post(
      AppApis.passwordReset.resetPassword,
      {
        otp: otp,
        resetToken: resetToken,
        password: password,
        confirmPassword: confirmPassword,
      },
      {
        isAuthRoute: false,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const resendEmailVerification = async (email: string) => {
  const response = await axiosInstance.post(
    AppApis.auth.resendEmailVerification,
    {
      email,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const verifyEmail = async (otp: string, email: string) => {
  const response = await axiosInstance.post(
    AppApis.auth.verifyEmail,
    {
      otp,
      email,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const register = async (formData: any) => {
  const response = await axiosInstance.post(AppApis.auth.register, formData, {
    isAuthRoute: false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
