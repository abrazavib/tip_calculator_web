import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/components/CustomButton";
import { CustomLabel } from "../../shared/components/CustomLabel";
import { tipService } from "../services/TipServices";
import type { Category, CategoryGroup } from "../services/TipServices";

export const ExpenseFormView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { totalPerPerson?: number } | null) ?? null;

  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [groupId, setGroupId] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  const [name, setName] = useState("");
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.totalPerPerson) {
      setTotalPerPerson(state.totalPerPerson);
    }
  }, [state]);

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
    if (!groupId) return;

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
            onChange={(e) => setGroupId(e.target.value)}
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
            onChange={(event) => setCategoryId(event.target.value)}
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
          onChange={(event) => setName(event.target.value)}
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
        <CustomButton
          onClick={() => {
            const selectedCategory = categories.find(
              (item) => item.id === categoryId,
            );
            const selectedGroup = groups.find((g) => g.id === groupId);
            console.log({
              groupId,
              groupName: selectedGroup?.name,
              categoryId,
              categoryName: selectedCategory?.name,
              name,
              totalPerPerson,
            });
          }}
        >
          Guardar gasto
        </CustomButton>
      </div>
    </div>
  );
};
