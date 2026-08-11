import { useEffect, useState } from "react";
import { tipService } from "../services/TipServices";
import type { Category, CategoryGroup } from "../types";

export interface UseExpenseFormOptions {
  initialTotalPerPerson?: number;
}

export const useExpenseForm = ({
  initialTotalPerPerson,
}: UseExpenseFormOptions = {}) => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [groupId, setGroupId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [totalPerPerson, setTotalPerPerson] = useState(
    initialTotalPerPerson ?? 0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTotalPerPerson !== undefined) {
      setTotalPerPerson(initialTotalPerPerson);
    }
  }, [initialTotalPerPerson]);

  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const g = await tipService.getGroups();
        setGroups(g);
        if (g.length > 0) {
          setGroupId(g[0].id);
        }
      } catch (err) {
        setError("No se pudieron cargar los grupos.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    if (!groupId) {
      setCategories([]);
      setCategoryId("");
      return;
    }

    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await tipService.getCategoriesByGroup(groupId);
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id);
        } else {
          setCategoryId("");
        }
      } catch (err) {
        setError("No se pudieron cargar las categorías.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [groupId]);

  const handleGroupChange = (selectedGroupId: string) => {
    setGroupId(selectedGroupId);
  };

  const handleCategoryChange = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleSaveExpense = () => {
    const selectedCategory = categories.find((item) => item.id === categoryId);
    const selectedGroup = groups.find((g) => g.id === groupId);

    console.log({
      groupId,
      groupName: selectedGroup?.name,
      categoryId,
      categoryName: selectedCategory?.name,
      name,
      totalPerPerson,
    });
  };

  return {
    groups,
    groupId,
    categories,
    categoryId,
    name,
    totalPerPerson,
    isLoading,
    error,
    handleGroupChange,
    handleCategoryChange,
    handleNameChange,
    handleSaveExpense,
  };
};
