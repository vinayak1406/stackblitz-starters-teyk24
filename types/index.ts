type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';
export interface RecurrenceState {
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
