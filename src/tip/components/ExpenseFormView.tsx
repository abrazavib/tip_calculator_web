import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/components/CustomButton";
import { CustomLabel } from "../../shared/components/CustomLabel";
import { CustomSelect } from "../../shared/components/CustomSelect";
import { ArrowLeft, Plus } from "lucide-react";
import { useExpenseForm } from "../hooks/useExpenseForm";

export const ExpenseFormView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { totalPerPerson?: number } | null) ?? null;

  const {
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
  } = useExpenseForm({ initialTotalPerPerson: state?.totalPerPerson });

  const onSaveClick = async () => {
    const success = await handleSaveExpense();
    if (success) {
      navigate("/history");
    }
  };

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
          <h1 className="text-3xl font-bold text-orange-500">
            Registro de gasto
          </h1>
        </div>
      </div>
      {error ? (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            label="Grupo"
            placeholder=""
            options={groups.map((g) => ({ id: g.id, name: g.name }))}
            value={groupId}
            onChange={handleGroupChange}
            loading={isLoading}
            maxWidth="max-w-sm"
          />
        </div>
        <button
          onClick={() => navigate("/create-group")}
          aria-label="Crear grupo"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            label="Categoría"
            placeholder=""
            options={categories.map((c) => ({ id: c.id, name: c.name }))}
            value={categoryId}
            onChange={handleCategoryChange}
            loading={isLoading}
            maxWidth="max-w-sm"
          />
        </div>
        <button
          onClick={() => navigate("/create-category")}
          aria-label="Crear categoría"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            label="Origen"
            placeholder=""
            options={sources.map((s) => ({ id: s.id, name: s.name }))}
            value={sourceId}
            onChange={handleSourceChange}
            loading={isLoading}
            maxWidth="max-w-sm"
          />
        </div>
        <button
          onClick={() => navigate("/create-source")}
          aria-label="Crear origen"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <CustomLabel label="Nombre" value="" />
        <div className={`relative w-full max-w-sm`}>
          <input
            type="text"
            className="w-full rounded-md border border-gray-200 p-2"
            placeholder="Ej. Cena familiar"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <CustomLabel label="Monto" value="" />
        <div className={`relative w-full max-w-sm`}>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-200 p-2"
            value={totalPerPerson}
            onChange={(e) => handleTotalPerPersonChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div />
        <CustomButton onClick={onSaveClick}>
          {isSaving ? "Guardando..." : "Guardar gasto"}
        </CustomButton>
      </div>
    </div>
  );
};
