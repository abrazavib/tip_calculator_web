import { apiClient } from "../../shared/api/apiClient";

export interface CategoryGroup {
  id: string;
  name: string;
  description: string | null;
  colorCode: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  colorCode: string;
  icon: string;
  categoryGroupId: string;
  createdAt: string;
  updatedAt: string;
  group: CategoryGroup;
}

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
