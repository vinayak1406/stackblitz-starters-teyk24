import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RecurringDatePicker from '@/components/Recurrence';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
// Mock the custom hook
jest.mock('@/store/store', () => ({
  useRecurrenceStore: jest.fn(() => ({
    startDate: new Date('2023-01-01'),
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
    setStartDate: jest.fn(),
    setEndDate: jest.fn(),
    setRecurrenceType: jest.fn(),
    setInterval: jest.fn(),
    setSelectedDays: jest.fn(),
    setMonthlyOption: jest.fn(),
    setSelectedMonthDays: jest.fn(),
    setSelectedMonthWeek: jest.fn(),
    setYearlyOption: jest.fn(),
    setSelectedMonth: jest.fn(),
    setSelectedMonthDay: jest.fn(),
    updatePreviewDates: jest.fn(),
  })),
}));
