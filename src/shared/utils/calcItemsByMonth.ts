import { Request } from '@/shared/api/requests/types';

export const calcItemsByMonth = (
  items: Request[],
  monthsBack: number = 0,
): number => {
  const now = new Date();
  const targetDate = new Date(
    now.getFullYear(),
    now.getMonth() - monthsBack,
    1,
  );
  const nextMonth = new Date(
    now.getFullYear(),
    now.getMonth() - monthsBack + 1,
    1,
  );

  return items.filter(item => {
    const itemDate = new Date(item.date._seconds * 1000);
    return itemDate >= targetDate && itemDate < nextMonth;
  }).length;
};

export const calcItemsByLastMonths = (
  items: Request[],
  months: number = 3,
): number => {
  const now = new Date();
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - (months - 1),
    1,
  );

  return items.filter(item => {
    const itemDate = new Date(item.date._seconds * 1000);
    return itemDate >= startDate;
  }).length;
};

export const calcItemsByCurrentMonthWithStatus = (
  items: Request[],
  status: string,
): number => {
  return calcItemsByMonthWithStatus(items, 0, status);
};

export const calcItemsByMonthWithStatus = (
  items: Request[],
  monthsBack: number = 0,
  status: string,
): number => {
  const now = new Date();
  const targetDate = new Date(
    now.getFullYear(),
    now.getMonth() - monthsBack,
    1,
  );
  const nextMonth = new Date(
    now.getFullYear(),
    now.getMonth() - monthsBack + 1,
    1,
  );

  return items.filter(item => {
    const itemDate = new Date(item.date._seconds * 1000);
    return (
      itemDate >= targetDate && itemDate < nextMonth && item.status === status
    );
  }).length;
};

export const calculatePercentageChange = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const getChartDataForCurrentMonth = (
  items: Request[],
): { leads: number; users: number } => {
  const currentMonthTotal = calcItemsByMonth(items, 0);
  const successCount = calcItemsByCurrentMonthWithStatus(items, 'success');

  return {
    leads: currentMonthTotal - successCount,
    users: successCount,
  };
};

export const getMonthlyTrendingPercentage = (items: Request[]): number => {
  const currentMonthTotal = calcItemsByMonth(items, 0);
  const previousMonthTotal = calcItemsByMonth(items, 1);

  return calculatePercentageChange(currentMonthTotal, previousMonthTotal);
};
