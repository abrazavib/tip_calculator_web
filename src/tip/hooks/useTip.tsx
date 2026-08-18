import { useEffect, useState } from "react";
import { tipService } from "../services/TipServices";
import type { Category, CategoryGroup } from "../types";

export interface UseTipOptions {
  initialTotalPerPerson?: number;
}

export const useTip = ({ initialTotalPerPerson }: UseTipOptions = {}) => {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [split, setSplit] = useState(1);

  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [groupId, setGroupId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const totalPerPerson = initialTotalPerPerson ?? 0;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleTipClicked = async (tip: number) => {
    setTip(tip);
  };

  const handleIncrementClick = () => {
    setSplit((prevSplit) => prevSplit + 1);
  };

  const handleDecrementClick = () => {
    setSplit((prevSplit) => (prevSplit > 1 ? prevSplit - 1 : 1));
  };

  const handleBillChange = (bill: number) => {
    setBill(bill);
  };

  const handleReset = () => {
    setBill(0);
    setTip(0);
    setSplit(1);
  };

  const handleGroupChange = (groupId: string) => {
    setGroupId(groupId);

    if (!groupId) {
      setCategories([]);
      setCategoryId("");
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const handleNameChange = (name: string) => {
    setName(name);
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
    // Tip calculator properties
    bill,
    tip,
    split,
    totalTip: (bill * tip) / 100,
    totalAmount: bill + (bill * tip) / 100,
    amountPerPerson: (bill + (bill * tip) / 100) / split,
    handleTipClicked,
    handleIncrementClick,
    handleDecrementClick,
    handleBillChange,
    handleReset,

    // Expense form properties
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
