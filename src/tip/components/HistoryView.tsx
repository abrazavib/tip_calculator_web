import {
  ArrowLeft,
  ArrowRight,
  CircleDashed,
  Clock3,
  Plus,
} from "lucide-react";
import { useHistory } from "../hooks/useHistory";
import { CustomHeader } from "../../shared/components/CustomHeader";
import { useNavigate } from "react-router-dom";

export const HistoryView = () => {
  const {
    currentMonthLabel,
    selectedDateLabel,
    monthDays,
    emptySlots,
    selectedDayTransactions,
    totalSelectedDay,
    totalMonth,
    isLoading,
    error,
    selectDay,
    goToPreviousMonth,
    goToNextMonth,
  } = useHistory();

  const navigate = useNavigate();

  const handleCreateExpense = () => {
    navigate("/expense", { state: { totalPerPerson: 0.0 } });
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2x1 bg-white shadow-lg pt-16 px-4 pb-12 sm:px-8">
      <CustomHeader title="Historial" subtitle="Gastos y movimientos" />

      <section className="mb-6 rounded-2x1 border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={goToPreviousMonth}
            className="rounded-md border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              {currentMonthLabel}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop: standard action placement */}
            <div className="hidden sm:block">
              <button
                onClick={handleCreateExpense}
                className="ml-4 inline-flex items-center gap-2 rounded-md border bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                <Plus className="h-4 w-4" />
                Nuevo gasto
              </button>
            </div>

            <button
              onClick={goToNextMonth}
              className="rounded-md border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((label) => (
            <div key={label}>{label}</div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2 text-center">
          {emptySlots.map((slot) => (
            <div
              key={`empty-${slot}`}
              className="h-11 rounded-lg bg-transparent"
            />
          ))}

          {monthDays.map((day) => (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => selectDay(day.dayNumber)}
              className={`flex h-11 items-center justify-center rounded-lg border px-2 text-sm transition focus:outline-none ${
                day.isSelected
                  ? "border-orange-500 bg-orange-100 text-orange-900"
                  : "border-transparent bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200"
              }`}
            >
              <span>{day.dayNumber}</span>
              {day.hasTransactions ? (
                <span className="ml-1 inline-flex h-2 w-2 rounded-full bg-orange-500" />
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2x1 border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total del mes</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            ${totalMonth.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2x1 border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total seleccionado</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            ${totalSelectedDay.toFixed(2)}
          </p>
        </div>
      </section>

      <section className="rounded-2x1 border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-sm text-slate-500">Movimientos de</p>
            <p className="text-lg font-semibold text-slate-900">
              {selectedDateLabel}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            <span>
              {selectedDayTransactions.length}
              {selectedDayTransactions.length === 1
                ? " transacción"
                : " transacciones"}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2x1 border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Cargando historial...
          </div>
        ) : error ? (
          <div className="rounded-2x1 border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : selectedDayTransactions.length === 0 ? (
          <div className="rounded-2x1 border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <CircleDashed className="h-6 w-6" />
            </div>
            <p>No hay movimientos para este día.</p>
            <p className="mt-1 text-xs text-slate-400">
              Selecciona otro día para ver más detalles.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-2x1 border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {transaction.category?.name ??
                        transaction.categoryName ??
                        "Sin categoría"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {transaction.source?.name ??
                        transaction.sourceName ??
                        "Origen desconocido"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900">
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        "es-ES",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mobile / tablet: floating action button */}
      <button
        onClick={handleCreateExpense}
        aria-label="Nuevo gasto"
        className="sm:hidden fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};
