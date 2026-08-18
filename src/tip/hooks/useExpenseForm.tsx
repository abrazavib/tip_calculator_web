import { useEffect, useState } from "react";
import { tipService } from "../services/TipServices";
import type { Category, CategoryGroup, Source } from "../types";

export interface UseExpenseFormOptions {
  initialTotalPerPerson?: number;
}

export const useExpenseForm = ({
  initialTotalPerPerson,
}: UseExpenseFormOptions = {}) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [sourceId, setSourceId] = useState("");
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [groupId, setGroupId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [totalPerPerson, setTotalPerPerson] = useState(
    initialTotalPerPerson ?? 0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTotalPerPerson !== undefined) {
      setTotalPerPerson(initialTotalPerPerson);
    }
  }, [initialTotalPerPerson]);

  useEffect(() => {
    const loadSources = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const s = await tipService.getUserSources();
        setSources(s);
        if (s.length > 0) {
          setSourceId(s[0].id);
        }
      } catch (err) {
        setError("No se pudieron cargar los datos de origen de usuario.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSources();
  }, []);

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

  const handleSourceChange = (selectedSourceId: string) => {
    setError(null);
    setSourceId(selectedSourceId);
  };

  const handleGroupChange = (selectedGroupId: string) => {
    setError(null);
    setGroupId(selectedGroupId);
  };

  const handleCategoryChange = (selectedCategoryId: string) => {
    setError(null);
    setCategoryId(selectedCategoryId);
  };

  const handleNameChange = (value: string) => {
    setError(null);
    setName(value);
  };

  const handleTotalPerPersonChange = (value: string | number) => {
    setError(null);
    if (typeof value === "number") {
      setTotalPerPerson(value);
      return;
    }

    // Allow values like "12.34" or "$12.34" or "12,34"
    const cleaned = value.replace(/[^0-9.,-]/g, "").replace(",", ".");
    const parsed = parseFloat(cleaned);
    setTotalPerPerson(Number.isFinite(parsed) ? parsed : 0);
  };

  const handleSaveExpense = async () => {
    if (!groupId || !categoryId || !sourceId) {
      setError("Debe seleccionar grupo, categoría y origen.");
      return false;
    }

    if (!name.trim()) {
      setError("El nombre del gasto no puede estar vacío.");
      return false;
    }

    if (!totalPerPerson || totalPerPerson <= 0) {
      setError("El monto del gasto debe ser mayor a cero.");
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      await tipService.createTransaction({
        name,
        description: `Gasto registrado: ${name}`,
        amount: totalPerPerson,
        type: "EXPENSE",
        categoryId,
        sourceId,
      });
      return true;
    } catch (err) {
      setError("No se pudo guardar el gasto. Intente de nuevo más tarde.");
      console.error(err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    sources,
    sourceId,
    groups,
    groupId,
    categories,
    categoryId,
    name,
    totalPerPerson,
    isLoading,
    isSaving,
    error,
    handleSourceChange,
    handleGroupChange,
    handleCategoryChange,
    handleNameChange,
    handleTotalPerPersonChange,
    handleSaveExpense,
  };
};
