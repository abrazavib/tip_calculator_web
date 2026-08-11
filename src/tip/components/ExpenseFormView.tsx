import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/components/CustomButton";
import { CustomLabel } from "../../shared/components/CustomLabel";
import { useExpenseForm } from "../hooks/useExpenseForm";

export const ExpenseFormView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { totalPerPerson?: number } | null) ?? null;

  const {
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
  } = useExpenseForm({ initialTotalPerPerson: state?.totalPerPerson });

  return (
    <div className="mx-auto max-w-xl rounded-2x1 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500">
          Registro de gasto
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Completa los datos del gasto para guardarlo en tu registro.
        </p>
      </div>

      <div className="mb-4">
        <CustomLabel label="Grupo" value="Selecciona un grupo" />
        {isLoading && groups.length === 0 ? (
          <p className="text-sm text-gray-500">Cargando grupos...</p>
        ) : (
          <select
            className="w-full rounded-md border border-gray-200 p-3"
            value={groupId}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <CustomLabel label="Categoría" value="Selecciona una opción" />
        {isLoading && categories.length === 0 ? (
          <p className="text-sm text-gray-500">Cargando categorías...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <select
            className="w-full rounded-md border border-gray-200 p-3"
            value={categoryId}
            onChange={(event) => handleCategoryChange(event.target.value)}
          >
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <CustomLabel label="Nombre" value="Describe el gasto" />
        <input
          type="text"
          className="w-full rounded-md border border-gray-200 p-2"
          placeholder="Ej. Cena familiar"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
        />
      </div>

      <div className="mb-6">
        <CustomLabel label="Total p/person" value="Valor heredado" />
        <input
          type="text"
          className="w-full rounded-md border border-gray-200 p-2 bg-gray-50"
          value={`$${totalPerPerson.toFixed(2)}`}
          readOnly
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <CustomButton onClick={() => navigate(-1)}>Volver</CustomButton>
        <CustomButton onClick={handleSaveExpense}>Guardar gasto</CustomButton>
      </div>
    </div>
  );
};
