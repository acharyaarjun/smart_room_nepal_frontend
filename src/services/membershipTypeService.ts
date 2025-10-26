import { AppApis } from "@/utils";
import axiosInstance from "./apiService";

interface Params {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllMembershipTypes = async ({
  page = 1,
  size = 100,
  search = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;

  const response = await axiosInstance.get(AppApis.membershipType.all, {
    params,
  });
  return response.data;
};

export const createMembership = async (membershipTypeId: number) => {
  const response = await axiosInstance.post(AppApis.membership.create, {
    membershipTypeId,
  });
  return response.data;
};

export const getMembershipPayment = async ({
  page = 1,
  size = 100,
  search = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  const response = await axiosInstance.get(AppApis.membership.getPayment, {
    params,
  });
  return response.data;
};
