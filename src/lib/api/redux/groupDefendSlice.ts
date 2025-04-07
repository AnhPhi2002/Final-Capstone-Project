// lib/api/groupApi.ts
import { axiosClient } from "../config/axios-client";
import { GroupWithDetails } from "../types";

export const fetchGroupDetailsBySemester = async (
  semesterId: string
): Promise<GroupWithDetails[]> => {
  const response = await axiosClient.get(`/groups/semester/${semesterId}`);
  return response.data.groups; // kiểu GroupWithDetails[]
};

