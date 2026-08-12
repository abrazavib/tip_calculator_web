import { apiClient } from "../../shared/api/apiClient";
import type { Category, CategoryGroup, Source } from "../types";

export interface TransactionPayload {
  name: string;
  description: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  categoryId: string;
  sourceId: string;
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

  getUserSources: async () => {
    const response = await apiClient.get<Source[]>(`/api/v1/sources`);
    return response.data;
  },

  createTransaction: async (payload: TransactionPayload) => {
    const response = await apiClient.post("/api/v1/transactions", payload);
    return response.data;
  },
};
