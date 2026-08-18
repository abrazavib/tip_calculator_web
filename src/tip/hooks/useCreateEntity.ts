import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tipService } from "../services/TipServices";
import type { CategoryGroup } from "../types";

interface UseCreateEntityOptions {
  entityType: "group" | "category" | "source";
  defaultIcon?: string;
}

interface GroupForm {
  name: string;
  description: string;
  colorCode: string;
}

interface CategoryForm {
  name: string;
  categoryGroupId: string;
  colorCode: string;
}

interface SourceForm {
  name: string;
}

type FormData = GroupForm | CategoryForm | SourceForm;

export const useCreateEntity = (options: UseCreateEntityOptions) => {
  const navigate = useNavigate();
  const initialFormData = (): FormData => {
    switch (options.entityType) {
      case "group":
        return { name: "", description: "", colorCode: "#FFFFFF" };
      case "category":
        return { name: "", categoryGroupId: "", colorCode: "#FFFFFF" };
      case "source":
        return { name: "" };
      default:
        return { name: "" };
    }
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (options.entityType === "category") {
      const loadGroups = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const g = await tipService.getGroups();
          setGroups(g);
          if (g.length > 0) {
            setFormData((prev) => ({
              ...prev,
              categoryGroupId:
                (prev as CategoryForm).categoryGroupId || g[0].id,
            }));
          }
        } catch (err) {
          setError("No se pudieron cargar los grupos.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadGroups();
    }
  }, [options.entityType]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    let payload: GroupPayload | CategoryPayload | SourcePayload;
    switch (options.entityType) {
      case "group": {
        const data = formData as GroupForm;
        payload = {
          name: data.name,
          description: data.description,
          colorCode: data.colorCode,
          icon: options.defaultIcon || "default-icon",
        };

        setIsSaving(true);
        setError(null);

        try {
          await tipService.createGroup(payload);
        } catch (err) {
          setError("No se pudo crear el grupo. Intenta nuevamente.");
          console.error(err);
        } finally {
          setIsSaving(false);
        }
        break;
      }
      case "category": {
        const data = formData as CategoryForm;
        payload = {
          name: data.name,
          categoryGroupId: data.categoryGroupId,
          colorCode: data.colorCode,
          icon: options.defaultIcon || "default-icon",
        };
        setIsSaving(true);
        setError(null);

        try {
          await tipService.createCategory(payload);
        } catch (err) {
          setError("No se pudo crear la categorpia. Intenta nuevamente.");
          console.error(err);
        } finally {
          setIsSaving(false);
        }
        break;
      }
      case "source": {
        const data = formData as SourceForm;
        payload = {
          name: data.name,
        };
        setIsSaving(true);
        setError(null);

        try {
          await tipService.createSource(payload);
        } catch (err) {
          setError("No se pudo crear el elemento. Intenta nuevamente.");
          console.error(err);
        } finally {
          setIsSaving(false);
        }
        break;
      }
      default:
        payload = { name: "" };
    }
    navigate(-1);
  };

  return {
    formData,
    handleChange,
    handleSave,
    groups,
    isLoading,
    isSaving,
    error,
  };
};
