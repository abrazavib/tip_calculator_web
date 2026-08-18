import { apiClient } from "../../shared/api/apiClient";
import type {
  Category,
  CategoryGroup,
  CategoryPayload,
  GroupPayload,
  Source,
  SourcePayload,
  Transaction,
  TransactionPayload,
} from "../types";

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

  getTransactionsByMonth: async (monthKey: string) => {
    const response = await apiClient.get<Transaction[]>(
      `/api/v1/transactions?monthkey=${monthKey}`,
    );
    return response.data;
  },

  createGroup: async (payload: GroupPayload) => {
    const response = await apiClient.post("/api/v1/groups", payload);
    return response.data;
  },

  createCategory: async (payload: CategoryPayload) => {
    const response = await apiClient.post("/api/v1/categories", payload);
    return response.data;
  },

  createSource: async (payload: SourcePayload) => {
    const response = await apiClient.post("/api/v1/sources", payload);
    return response.data;
  },
};
