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
