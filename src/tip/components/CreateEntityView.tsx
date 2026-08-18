import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/components/CustomButton";
import { CustomLabel } from "../../shared/components/CustomLabel";
import { CustomSelect } from "../../shared/components/CustomSelect";
import { useCreateEntity } from "../hooks/useCreateEntity";
import type { CreateEntityViewProps } from "../types";

const CONFIG = {
  group: {
    title: "Crear Grupo",
    buttonLabel: "Crear Grupo",
    namePlaceholder: "Ej. Alimentación",
    descPlaceholder: "Ej. Gastos relacionados con comida",
    iconPlaceholder: "Ej. 🍽️",
    defaultIcon: "📁",
  },
  category: {
    title: "Crear Categoría",
    buttonLabel: "Crear Categoría",
    namePlaceholder: "Ej. Desayuno",
    descPlaceholder: "Ej. Desayunos y café",
    iconPlaceholder: "Ej. ☕",
    defaultIcon: "📂",
  },
  source: {
    title: "Crear Origen",
    buttonLabel: "Crear Origen",
    namePlaceholder: "Ej. Tarjeta Crédito",
    descPlaceholder: "Ej. Tarjeta de crédito principal",
    iconPlaceholder: "Ej. 💰",
    defaultIcon: "💳",
  },
};

export const CreateEntityView: React.FC<CreateEntityViewProps> = ({ type }) => {
  const navigate = useNavigate();
  const config = CONFIG[type];
  const {
    formData,
    handleChange,
    handleSave,
    groups,
    isLoading,
    error,
    isSaving,
  } = useCreateEntity({
    entityType: type,
    defaultIcon: config.defaultIcon,
  });

  return (
    <div className="mx-auto max-w-xl rounded-2x1 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="Volver"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-orange-500">{config.title}</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-4">
        <CustomLabel label="Nombre" value="" />
        <input
          type="text"
          className="w-full rounded-md border border-gray-200 p-2"
          placeholder={config.namePlaceholder}
          value={(formData as any).name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      {type === "category" && (
        <div className="mb-4">
          <CustomSelect
            label="Grupo"
            placeholder=""
            options={groups.map((g) => ({ id: g.id, name: g.name }))}
            value={(formData as any).categoryGroupId || ""}
            onChange={(value) => handleChange("categoryGroupId", value)}
            loading={isLoading}
            maxWidth="max-w-sm"
          />
        </div>
      )}

      {type === "group" && (
        <div className="mb-4">
          <CustomLabel label="Descripción" value="" />
          <textarea
            className="w-full rounded-md border border-gray-200 p-2"
            placeholder={config.descPlaceholder}
            rows={3}
            value={(formData as any).description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      )}

      {(type === "category" || type === "group") && (
        <div className="mb-4">
          <CustomLabel label="Color" value="" />
          <input
            type="color"
            className="h-10 w-20 rounded-md border border-gray-200 p-1"
            value={(formData as any).colorCode}
            onChange={(e) => handleChange("colorCode", e.target.value)}
          />
        </div>
      )}

      {/* Icon is not used per-entity; removed from formData to avoid type errors */}

      <div className="flex flex-col sm:flex-row gap-3">
        <CustomButton onClick={() => navigate(-1)}>Cancelar</CustomButton>
        <CustomButton onClick={handleSave}>
          {isSaving ? "Guardando..." : config.buttonLabel}
        </CustomButton>
      </div>
    </div>
  );
};
