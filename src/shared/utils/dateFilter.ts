import * as React from 'react';
import { DateRange } from 'react-day-picker';

export interface DateFilterable {
  date: Date | string | { _seconds: number } | { seconds: number };
}

export type DateValue =
  | Date
  | string
  | { _seconds: number; _nanoseconds?: number }
  | { seconds: number }
  | number
  | null
  | undefined;
export function filterByDateRange<T extends Record<string, DateValue>>(
  data: T[],
  dateRange: DateRange | undefined,
  dateKey: keyof T = 'date' as keyof T,
): T[] {
  if (!dateRange?.from) {
    return data;
  }

  const fromDate = dateRange.from;
  const toDate = dateRange.to || dateRange.from;

  return data.filter(item => {
    const itemDate = normalizeDate(item[dateKey]);

    if (!itemDate) return false;

    return itemDate >= fromDate && itemDate <= toDate;
  });
}

export function normalizeDate(dateValue: DateValue | unknown): Date | null {
  if (!dateValue) return null;

  try {
    if (dateValue instanceof Date) {
      return dateValue;
    }

    if (typeof dateValue === 'string') {
      return new Date(dateValue);
    }

    if (
      typeof dateValue === 'object' &&
      '_seconds' in dateValue &&
      (dateValue as { _seconds: number })._seconds
    ) {
      return new Date((dateValue as { _seconds: number })._seconds * 1000);
    }

    if (
      typeof dateValue === 'object' &&
      'seconds' in dateValue &&
      (dateValue as { seconds: number }).seconds
    ) {
      return new Date((dateValue as { seconds: number }).seconds * 1000);
    }

    if (typeof dateValue === 'number') {
      return dateValue > 1000000000000
        ? new Date(dateValue)
        : new Date(dateValue * 1000);
    }

    return null;
  } catch (error) {
    console.warn('Failed to normalize date:', dateValue, error);
    return null;
  }
}

export function useDateFilter<T extends Record<string, DateValue>>(
  initialData: T[],
  dateKey: keyof T = 'date' as keyof T,
) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const filteredData = React.useMemo(() => {
    return filterByDateRange(initialData, dateRange, dateKey);
  }, [initialData, dateRange, dateKey]);

  return {
    dateRange,
    setDateRange,
    filteredData,
    clearFilter: () => setDateRange(undefined),
  };
}
