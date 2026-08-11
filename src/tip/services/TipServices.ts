import { apiClient } from "../../shared/api/apiClient";
import type { Category, CategoryGroup } from "../types";

export const tipService = {
  getCategories: async () => {
    const response = await apiClient.get<Category[]>("/api/v1/categories/");
    return response.data;
  },
  getGroups: async () => {
    const response = await apiClient.get<CategoryGroup[]>("/api/v1/groups");
    return response.data;
  },
  getCategoriesByGroup: async (groupId: string) => {
    const response = await apiClient.get<Category[]>(
      `/api/v1/categories/group/${groupId}`,
    );
    return response.data;
  },
};
