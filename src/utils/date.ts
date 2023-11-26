import { type Dayjs } from 'dayjs';

export const getIsDateInRange = (date: Dayjs, startDate: Dayjs | null, endDate: Dayjs | null) => {
  if (!startDate) return false;
  if (!endDate) return date.isSame(startDate, 'day');
  return date.isBetween(startDate, endDate, 'day', '[]');
};

export const getPartialDatesInPrevMonth = (currentMonth: Dayjs) => {
  const firstDayOfCurrentMonth = currentMonth.startOf('month').day() || 7;
  const prevMonth = currentMonth.subtract(1, 'month');
  const daysInPrevMonth = prevMonth.daysInMonth();

  return Array.from(
    { length: firstDayOfCurrentMonth - 1 },
    (_, i) => daysInPrevMonth - (firstDayOfCurrentMonth - 1) + 1 + i
  );
};

export const getPartialDatesInNextMonth = (currentMonth: Dayjs) => {
  const lastDayOfCurrentMonth = currentMonth.endOf('month').day() || 7;
  return Array.from({ length: 7 - lastDayOfCurrentMonth }, (_, i) => i + 1);
};
