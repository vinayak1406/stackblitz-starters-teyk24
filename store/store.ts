import { create } from 'zustand';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  getDate,
  getDay,
  getWeekOfMonth,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  startDate: Date | null;
  endDate: Date | null;
  recurrenceType: RecurrenceType;
  interval: number;
  selectedDays: number[];
  monthlyOption: 'dayOfMonth' | 'dayOfWeek';
  selectedMonthDays: number[];
  selectedMonthWeek: number;
  yearlyOption: 'specificDate' | 'specificDay';
  selectedMonth: number;
  selectedMonthDay: number;
  previewDates: Date[];
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setSelectedDays: (days: number[]) => void;
  setMonthlyOption: (option: 'dayOfMonth' | 'dayOfWeek') => void;
  setSelectedMonthDays: (days: number[]) => void;
  setSelectedMonthWeek: (week: number) => void;
  setYearlyOption: (option: 'specificDate' | 'specificDay') => void;
  setSelectedMonth: (month: number) => void;
  setSelectedMonthDay: (day: number) => void;
  updatePreviewDates: () => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set, get) => ({
  startDate: null,
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  selectedDays: [],
  monthlyOption: 'dayOfMonth',
  selectedMonthDays: [],
  selectedMonthWeek: 1,
  yearlyOption: 'specificDate',
  selectedMonth: 0,
  selectedMonthDay: 1,
  previewDates: [],
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (interval) => set({ interval }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  setMonthlyOption: (option) => set({ monthlyOption: option }),
  setSelectedMonthDays: (days) => set({ selectedMonthDays: days }),
  setSelectedMonthWeek: (week) => set({ selectedMonthWeek: week }),
  setYearlyOption: (option) => set({ yearlyOption: option }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedMonthDay: (day) => set({ selectedMonthDay: day }),
  updatePreviewDates: () => {
    const {
      startDate,
      endDate,
      recurrenceType,
      interval,
      selectedDays,
      monthlyOption,
      selectedMonthDays,
      selectedMonthWeek,
      yearlyOption,
      selectedMonth,
      selectedMonthDay,
    } = get();

    if (!startDate) return;

    const dates: Date[] = [];
    let currentDate = startDate;
    const maxDate = endDate || addYears(startDate, 1);

    const addDateIfValid = (date: Date) => {
      if (date <= maxDate) {
        dates.push(date);
        return true;
      }
      return false;
    };

    const getWeekOfMonthDate = (
      date: Date,
      weekOfMonth: number,
      dayOfWeek: number
    ) => {
      let current = startOfMonth(date);
      let week = 1;
      while (week <= 5) {
        if (getDay(current) === dayOfWeek) {
          if (
            week === weekOfMonth ||
            (weekOfMonth === -1 && isSameMonth(current, endOfMonth(date)))
          ) {
            return current;
          }
          week++;
        }
        current = addDays(current, 1);
      }
      return null;
    };

    while (currentDate <= maxDate) {
      switch (recurrenceType) {
        case 'daily':
          if (addDateIfValid(currentDate)) {
            currentDate = addDays(currentDate, interval);
          }
          break;
        case 'weekly':
          if (selectedDays.includes(getDay(currentDate))) {
            if (addDateIfValid(currentDate)) {
              currentDate = addDays(currentDate, 1);
            }
          } else {
            currentDate = addDays(currentDate, 1);
          }
          if (getDay(currentDate) === 0) {
            currentDate = addWeeks(currentDate, interval - 1);
          }
          break;
        case 'monthly':
          if (monthlyOption === 'dayOfMonth') {
            if (selectedMonthDays.includes(getDate(currentDate))) {
              if (addDateIfValid(currentDate)) {
                currentDate = addMonths(currentDate, interval);
              }
            } else {
              currentDate = addDays(currentDate, 1);
            }
          } else {
            for (const day of selectedDays) {
              const weekOfMonthDate = getWeekOfMonthDate(
                currentDate,
                selectedMonthWeek,
                day
              );
              if (
                weekOfMonthDate &&
                isSameMonth(weekOfMonthDate, currentDate)
              ) {
                if (addDateIfValid(weekOfMonthDate)) {
                  break;
                }
              }
            }
            currentDate = addMonths(currentDate, interval);
          }
          break;
        case 'yearly':
          if (yearlyOption === 'specificDate') {
            if (
              currentDate.getMonth() === selectedMonth &&
              getDate(currentDate) === selectedMonthDay
            ) {
              if (addDateIfValid(currentDate)) {
                currentDate = addYears(currentDate, interval);
              }
            } else {
              currentDate = addDays(currentDate, 1);
            }
          } else {
            for (const day of selectedDays) {
              const weekOfMonthDate = getWeekOfMonthDate(
                currentDate,
                selectedMonthWeek,
                day
              );
              if (
                weekOfMonthDate &&
                isSameMonth(weekOfMonthDate, currentDate) &&
                currentDate.getMonth() === selectedMonth
              ) {
                if (addDateIfValid(weekOfMonthDate)) {
                  currentDate = addYears(currentDate, interval);
                  break;
                }
              }
            }
            if (isSameDay(currentDate, addDays(currentDate, -1))) {
              currentDate = addDays(currentDate, 1);
            }
          }
          break;
      }
    }

    set({ previewDates: dates });
  },
}));
