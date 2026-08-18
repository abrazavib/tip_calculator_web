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

export interface Source {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupPayload {
  name: string;
  description: string;
  colorCode: string;
  icon: string;
}

export interface CategoryPayload {
  name: string;
  categoryGroupId: string;
  colorCode: string;
  icon: string;
}

export interface SourcePayload {
  name: string;
}

export interface Transaction {
  id: string;
  name: string;
  description?: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  categoryId?: string;
  sourceId?: string;
  createdAt: string;
  updatedAt?: string;
  category?: Category;
  source?: Source;
  categoryName?: string;
  sourceName?: string;
}

export interface TransactionPayload {
  name: string;
  description: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  categoryId: string;
  sourceId: string;
}

export interface CreateEntityViewProps {
  type: "group" | "category" | "source";
}
