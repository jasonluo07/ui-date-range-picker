import dayjs, { type Dayjs } from 'dayjs';

import styles from './Calendar.module.css';

import DateButton from './DateButton';

type CalendarProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  currentMonth: Dayjs;
  onPickDateRange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Calendar = ({ startDate, endDate, currentMonth, onPickDateRange }: CalendarProps) => {
  const today = dayjs();

  const getIsDateInRange = (date: Dayjs) => {
    if (!startDate) return false;
    if (!endDate) return date.isSame(startDate, 'day');
    return date.isBetween(startDate, endDate, 'day', '[]');
  };

  const getPartialDatesInPrevMonth = () => {
    const firstDayOfCurrentMonth = currentMonth.startOf('month').day() || 7;
    const prevMonth = currentMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    return Array.from(
      { length: firstDayOfCurrentMonth - 1 },
      (_, i) => daysInPrevMonth - (firstDayOfCurrentMonth - 1) + 1 + i
    );
  };

  const getPartialDatesInNextMonth = () => {
    const lastDayOfCurrentMonth = currentMonth.endOf('month').day() || 7;
    return Array.from({ length: 7 - lastDayOfCurrentMonth }, (_, i) => i + 1);
  };

  const renderDateButtons = () => {
    const partialDatesInPrevMonth = getPartialDatesInPrevMonth();
    const partialDatesInNextMonth = getPartialDatesInNextMonth();
    const datesInCurrentMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) => i + 1);

    return (
      <>
        {partialDatesInPrevMonth.map((date) => {
          const dayjsDate = currentMonth.subtract(1, 'month').set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate);

          return (
            <DateButton
              date={dayjsDate}
              isToday={false}
              isCurrentMonth={false}
              isDateInRange={isDateInRange}
              key={`prev-${date}`}
            />
          );
        })}
        {datesInCurrentMonth.map((date) => {
          const dayjsDate = currentMonth.set('date', date);
          const isToday = dayjsDate.isSame(today, 'day');
          const isDateInRange = getIsDateInRange(dayjsDate);

          return (
            <DateButton
              date={dayjsDate}
              isToday={isToday}
              isCurrentMonth={true}
              isDateInRange={isDateInRange}
              key={`current-${date}`}
            />
          );
        })}
        {partialDatesInNextMonth.map((date) => {
          const dayjsDate = currentMonth.add(1, 'month').set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate);

          return (
            <DateButton
              date={dayjsDate}
              isToday={false}
              isCurrentMonth={false}
              isDateInRange={isDateInRange}
              key={`next-${date}`}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={styles.calendar} onClick={onPickDateRange}>
      {renderDateButtons()}
    </div>
  );
};

export default Calendar;
