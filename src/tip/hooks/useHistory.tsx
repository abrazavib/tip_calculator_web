import { useEffect, useMemo, useState } from "react";
import { tipService } from "../services/TipServices";
import type { Transaction } from "../types";

const formatMonthLabel = (date: Date) =>
  date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const padDate = (value: number) => String(value).padStart(2, "0");

const getDateKey = (date: Date) =>
  `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(
    date.getDate(),
  )}`;

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const useHistory = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const monthKey = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, "0")}`;

    const loadTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await tipService.getTransactionsByMonth(monthKey);
        setTransactions(data);
      } catch (err) {
        setError("No se pudo cargar el historial de transacciones.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [currentMonth]);

  useEffect(() => {
    if (
      selectedDate.getFullYear() !== currentMonth.getFullYear() ||
      selectedDate.getMonth() !== currentMonth.getMonth()
    ) {
      setSelectedDate(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
      );
    }
  }, [currentMonth, selectedDate]);

  const dayCount = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  );

  const monthTransactionsByDate = useMemo(() => {
    return transactions.reduce<Record<string, Transaction[]>>((acc, txn) => {
      const key = getDateKey(new Date(txn.createdAt));
      const list = acc[key] ?? [];
      list.push(txn);
      acc[key] = list;
      return acc;
    }, {});
  }, [transactions]);

  const selectedDayKey = getDateKey(selectedDate);
  const selectedDayTransactions = monthTransactionsByDate[selectedDayKey] ?? [];

  const totalSelectedDay = selectedDayTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0,
  );

  const totalMonth = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const selectDay = (day: number) => {
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const firstDayOfWeek = currentMonth.getDay();
  const emptySlots = Array.from(
    { length: firstDayOfWeek },
    (_, index) => index + 1,
  );

  const monthDays = Array.from({ length: dayCount }, (_, index) => {
    const dayNumber = index + 1;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      dayNumber,
    );
    return {
      dayNumber,
      date,
      isSelected: getDateKey(date) === selectedDayKey,
      hasTransactions: Boolean(
        monthTransactionsByDate[getDateKey(date)]?.length,
      ),
    };
  });

  return {
    currentMonthLabel: formatMonthLabel(currentMonth),
    selectedDateLabel: formatDayLabel(selectedDate),
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
  };
};
